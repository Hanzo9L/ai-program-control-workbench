import type { GateDefinition, GateKey, GateStatus, LifecycleState, Readiness } from './types';

export const LIFECYCLE_STATES = [
	'Draft',
	'Intake Review',
	'Risk Review',
	'Ready for Approval',
	'Approved for Launch',
	'In Pilot',
	'Complete'
] as const satisfies readonly LifecycleState[];

export const READINESS_VALUES = ['Blocked', 'Clear'] as const satisfies readonly Readiness[];

export const GATE_STATUSES = [
	'Open',
	'Satisfied',
	'Not Applicable'
] as const satisfies readonly GateStatus[];

export const REQUIRED_GATE_DEFINITIONS = [
	{
		key: 'security_readiness',
		label: 'Security readiness'
	},
	{
		key: 'storage_tool_approval',
		label: 'Storage / tool approval'
	},
	{
		key: 'data_sensitivity_review',
		label: 'Data sensitivity review'
	},
	{
		key: 'baa_vendor_review',
		label: 'BAA / vendor review'
	},
	{
		key: 'human_accountability',
		label: 'Human accountability'
	},
	{
		key: 'audit_logging_readiness',
		label: 'Audit / logging readiness'
	},
	{
		key: 'retention_residency_review',
		label: 'Retention / residency review'
	}
] as const satisfies readonly GateDefinition[];

export const REQUIRED_GATE_KEYS = REQUIRED_GATE_DEFINITIONS.map(
	(definition) => definition.key
) as GateKey[];

export const PRE_RISK_REVIEW_STATES = ['Draft', 'Intake Review'] as const satisfies readonly LifecycleState[];
