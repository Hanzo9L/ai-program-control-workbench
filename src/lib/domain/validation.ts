import {
	GATE_STATUSES,
	LIFECYCLE_STATES,
	PRE_RISK_REVIEW_STATES,
	READINESS_VALUES,
	REQUIRED_GATE_KEYS
} from './constants';
import type { Gate, GateKey, GateStatus, Initiative, LifecycleState, Readiness } from './types';

const LIFECYCLE_SET = new Set<string>(LIFECYCLE_STATES);
const READINESS_SET = new Set<string>(READINESS_VALUES);
const GATE_STATUS_SET = new Set<string>(GATE_STATUSES);
const REQUIRED_GATE_KEY_SET = new Set<string>(REQUIRED_GATE_KEYS);
const PRE_RISK_REVIEW_SET = new Set<string>(PRE_RISK_REVIEW_STATES);

export function isCanonicalLifecycleState(value: string): value is LifecycleState {
	return LIFECYCLE_SET.has(value);
}

export function isCanonicalReadiness(value: string): value is Readiness {
	return READINESS_SET.has(value);
}

export function isCanonicalGateStatus(value: string): value is GateStatus {
	return GATE_STATUS_SET.has(value);
}

export function isRequiredGateKey(value: string): value is GateKey {
	return REQUIRED_GATE_KEY_SET.has(value);
}

export function isPreRiskReview(state: LifecycleState): boolean {
	return PRE_RISK_REVIEW_SET.has(state);
}

export function applicableRequiredOpenGates(gates: Gate[]): Gate[] {
	return gates.filter((gate) => isRequiredGateKey(gate.key) && gate.status === 'Open');
}

/** Stage-aware expected readiness. Does not change lifecycle state. */
export function expectedReadiness(initiative: Pick<Initiative, 'lifecycleState' | 'gates'>): Readiness {
	if (isPreRiskReview(initiative.lifecycleState)) {
		return 'Clear';
	}

	return applicableRequiredOpenGates(initiative.gates).length > 0 ? 'Blocked' : 'Clear';
}

export function validateInitiative(initiative: Initiative): string[] {
	const errors: string[] = [];
	const prefix = `${initiative.id} (${initiative.name})`;

	if (!isCanonicalLifecycleState(initiative.lifecycleState)) {
		errors.push(`${prefix}: lifecycle state is not canonical: ${initiative.lifecycleState}`);
	}

	if (!isCanonicalReadiness(initiative.readiness)) {
		errors.push(`${prefix}: readiness is not canonical: ${initiative.readiness}`);
	}

	const keys = initiative.gates.map((gate) => gate.key);
	const uniqueKeys = new Set(keys);

	for (const requiredKey of REQUIRED_GATE_KEYS) {
		const count = keys.filter((key) => key === requiredKey).length;
		if (count !== 1) {
			errors.push(`${prefix}: required gate ${requiredKey} occurs ${count} time(s); expected exactly once`);
		}
	}

	if (uniqueKeys.size !== keys.length) {
		errors.push(`${prefix}: duplicate gate keys present`);
	}

	for (const gate of initiative.gates) {
		if (!isRequiredGateKey(gate.key)) {
			errors.push(`${prefix}: unknown gate key ${String(gate.key)}`);
		}

		if (!isCanonicalGateStatus(gate.status)) {
			errors.push(`${prefix}: gate ${gate.key} has non-canonical status ${String(gate.status)}`);
		}

		if (String(gate.status) === 'Waived') {
			errors.push(`${prefix}: gate ${gate.key} uses forbidden status Waived`);
		}
	}

	if (isCanonicalLifecycleState(initiative.lifecycleState) && isCanonicalReadiness(initiative.readiness)) {
		const expected = expectedReadiness(initiative);

		if (initiative.readiness !== expected) {
			errors.push(
				`${prefix}: readiness ${initiative.readiness} is inconsistent with stage-aware gates (expected ${expected})`
			);
		}

		if (!isPreRiskReview(initiative.lifecycleState)) {
			const openGates = applicableRequiredOpenGates(initiative.gates);
			if (initiative.readiness === 'Blocked' && openGates.length === 0) {
				errors.push(`${prefix}: Blocked at ${initiative.lifecycleState} requires at least one applicable required Open gate`);
			}
			if (initiative.readiness === 'Clear' && openGates.length > 0) {
				errors.push(`${prefix}: Clear at ${initiative.lifecycleState} cannot have applicable required Open gates`);
			}
		}
	}

	return errors;
}

export function validateFixtureSet(initiatives: readonly Initiative[]): string[] {
	return initiatives.flatMap(validateInitiative);
}
