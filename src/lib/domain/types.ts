export type LifecycleState =
	| 'Draft'
	| 'Intake Review'
	| 'Risk Review'
	| 'Ready for Approval'
	| 'Approved for Launch'
	| 'In Pilot'
	| 'Complete';

export type Readiness = 'Blocked' | 'Clear';

export type GateStatus = 'Open' | 'Satisfied' | 'Not Applicable';

export type GateKey =
	| 'security_readiness'
	| 'storage_tool_approval'
	| 'data_sensitivity_review'
	| 'baa_vendor_review'
	| 'human_accountability'
	| 'audit_logging_readiness'
	| 'retention_residency_review';

/** Recorded working classification. Not a compliance determination. */
export type SensitivityLabel = 'Neither PHI nor PII described' | 'PII described' | 'PHI described';

export type AiSuggestionKind =
	| 'intake_summary'
	| 'preliminary_classification'
	| 'missing_information'
	| 'risk_indicator'
	| 'leadership_draft';

export interface GateDefinition {
	key: GateKey;
	label: string;
}

export interface RecordedGateDecision {
	actor: string;
	recordedAt: string;
}

export interface Gate {
	key: GateKey;
	label: string;
	status: GateStatus;
	/** Required by spec when status is Open; may be unset on incomplete intake. */
	owner: string | null;
	notes: string;
	recordedDecision?: RecordedGateDecision;
}

export interface AiSuggestion {
	kind: AiSuggestionKind;
	text: string;
}

export interface Initiative {
	id: string;
	name: string;
	problemOutcome: string;
	intendedUsers: string;
	syntheticDataDescription: string;
	toolsVendors: string;
	owner: string | null;
	sponsor: string | null;
	successSignal: string;
	knownConstraints: string;
	lifecycleState: LifecycleState;
	readiness: Readiness;
	classification: SensitivityLabel | null;
	gates: Gate[];
	notes: string;
	aiSuggestions: AiSuggestion[];
	lastUpdated: string;
}
