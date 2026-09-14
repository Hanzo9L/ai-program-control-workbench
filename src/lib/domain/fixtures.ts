import { REQUIRED_GATE_DEFINITIONS } from './constants';
import type { Gate, GateKey, GateStatus, Initiative, RecordedGateDecision } from './types';

type GateOverride = {
	status: GateStatus;
	owner?: string | null;
	notes?: string;
	recordedDecision?: RecordedGateDecision;
};

function recorded(actor: string, recordedAt: string): RecordedGateDecision {
	return { actor, recordedAt };
}

function createGates(overrides: Partial<Record<GateKey, GateOverride>>): Gate[] {
	return REQUIRED_GATE_DEFINITIONS.map((definition) => {
		const override = overrides[definition.key];
		const status = override?.status ?? 'Open';
		const decision =
			status === 'Open' ? undefined : override?.recordedDecision;

		return {
			key: definition.key,
			label: definition.label,
			status,
			owner: override?.owner ?? null,
			notes: override?.notes ?? '',
			...(decision ? { recordedDecision: decision } : {})
		};
	});
}

const INTERNAL_POLICY_ASSISTANT: Initiative = {
	id: 'syn-internal-policy-assistant',
	name: 'Internal policy assistant',
	problemOutcome:
		'Staff spend time searching published internal policy PDFs for answers that could be retrieved as Q&A.',
	intendedUsers: 'Internal staff using published policy documents',
	syntheticDataDescription: 'Synthetic excerpts from published internal policy PDFs. No PHI/PII described.',
	toolsVendors: 'Not yet specified',
	owner: null,
	sponsor: null,
	successSignal: 'Not yet specified',
	knownConstraints: 'Incomplete intake: owner, sponsor, tools, and success signal are missing.',
	lifecycleState: 'Draft',
	readiness: 'Clear',
	classification: null,
	gates: createGates({
		security_readiness: { status: 'Open' },
		storage_tool_approval: { status: 'Open' },
		data_sensitivity_review: { status: 'Open' },
		baa_vendor_review: { status: 'Open' },
		human_accountability: { status: 'Open' },
		audit_logging_readiness: { status: 'Open' },
		retention_residency_review: { status: 'Open' }
	}),
	notes: 'Synthetic draft. Open gates do not make readiness Blocked during Draft.',
	aiSuggestions: [
		{
			kind: 'intake_summary',
			text: 'Draft Q&A helper over published internal policy PDFs. Owner and several intake fields are missing.'
		},
		{
			kind: 'preliminary_classification',
			text: 'Suggested classification: Neither PHI nor PII described. Suggestion only; not recorded.'
		},
		{
			kind: 'missing_information',
			text: 'Missing owner, sponsor, tools/vendors, and success signal. These block submission, not readiness.'
		}
	],
	lastUpdated: '2026-09-10T14:00:00Z'
};

const SCHEDULING_ASSISTANT: Initiative = {
	id: 'syn-scheduling-assistant',
	name: 'Scheduling assistant',
	problemOutcome: 'Staff spend time proposing meeting times that could be drafted from calendar metadata.',
	intendedUsers: 'Internal coordinators scheduling staff meetings',
	syntheticDataDescription: 'Synthetic calendar metadata (busy/free times, meeting titles without personal contact lists).',
	toolsVendors: 'Internal calendar tool only; no external vendor recorded',
	owner: 'M. Chen',
	sponsor: 'A. Rivera',
	successSignal: 'Drafted meeting options accepted or edited by the requester.',
	knownConstraints: 'Must not read message bodies or contact lists beyond calendar metadata in this synthetic record.',
	lifecycleState: 'Ready for Approval',
	readiness: 'Clear',
	classification: 'Neither PHI nor PII described',
	gates: createGates({
		security_readiness: {
			status: 'Satisfied',
			owner: 'M. Chen',
			notes: 'Synthetic recorded control status. Not a compliance determination.',
			recordedDecision: recorded('M. Chen', '2026-08-20T15:00:00Z')
		},
		storage_tool_approval: {
			status: 'Satisfied',
			owner: 'M. Chen',
			notes: 'Internal calendar tool recorded as the proposed tool.',
			recordedDecision: recorded('M. Chen', '2026-08-20T15:05:00Z')
		},
		data_sensitivity_review: {
			status: 'Satisfied',
			owner: 'A. Rivera',
			notes: 'Working classification recorded as neither PHI nor PII described.',
			recordedDecision: recorded('A. Rivera', '2026-08-21T10:00:00Z')
		},
		baa_vendor_review: {
			status: 'Not Applicable',
			owner: 'A. Rivera',
			notes: 'No external vendor recorded. Human recorded Not Applicable.',
			recordedDecision: recorded('A. Rivera', '2026-08-21T10:05:00Z')
		},
		human_accountability: {
			status: 'Satisfied',
			owner: 'M. Chen',
			notes: 'Named owner recorded for consequential decisions.',
			recordedDecision: recorded('A. Rivera', '2026-08-21T10:10:00Z')
		},
		audit_logging_readiness: {
			status: 'Satisfied',
			owner: 'M. Chen',
			notes: 'Audit/logging expectation recorded for the proposed tool.',
			recordedDecision: recorded('M. Chen', '2026-08-21T11:00:00Z')
		},
		retention_residency_review: {
			status: 'Not Applicable',
			owner: 'A. Rivera',
			notes: 'No additional data store or transfer recorded beyond the calendar tool.',
			recordedDecision: recorded('A. Rivera', '2026-08-21T11:05:00Z')
		}
	}),
	notes: 'Synthetic approval-queue example. All applicable required gates are Satisfied or Not Applicable.',
	aiSuggestions: [
		{
			kind: 'intake_summary',
			text: 'Scheduling helper using calendar metadata only. Recorded classification: neither PHI nor PII described.'
		},
		{
			kind: 'leadership_draft',
			text: 'Ready for Approval with no open required gates. Suggestion only; not an approval.'
		}
	],
	lastUpdated: '2026-08-22T09:00:00Z'
};

const CLINICAL_NOTE_SUMMARIZATION: Initiative = {
	id: 'syn-clinical-note-summarization',
	name: 'Clinical-note summarization pilot',
	problemOutcome: 'Clinicians spend time rereading lengthy notes that could be summarized for a named owner.',
	intendedUsers: 'Named clinician owner in a limited synthetic pilot',
	syntheticDataDescription: 'Synthetic clinical notes written for this proof-of-work. Not real patient records.',
	toolsVendors: 'Proposed document store and summarization workspace (not implemented)',
	owner: 'S. Patel',
	sponsor: 'A. Rivera',
	successSignal: 'Named owner reports that the summary is usable as a draft they still review.',
	knownConstraints: 'High-sensitivity synthetic content. Storage and sensitivity gates remain Open.',
	lifecycleState: 'Risk Review',
	readiness: 'Blocked',
	classification: 'PHI described',
	gates: createGates({
		security_readiness: {
			status: 'Satisfied',
			owner: 'S. Patel',
			notes: 'Synthetic recorded control status. Not a security certification.',
			recordedDecision: recorded('S. Patel', '2026-09-01T13:00:00Z')
		},
		storage_tool_approval: {
			status: 'Open',
			owner: 'S. Patel',
			notes: 'Proposed storage/tool path is not yet recorded as Satisfied.'
		},
		data_sensitivity_review: {
			status: 'Open',
			owner: 'A. Rivera',
			notes: 'Sensitivity review is in progress. Not a HIPAA determination.'
		},
		baa_vendor_review: {
			status: 'Not Applicable',
			owner: 'A. Rivera',
			notes: 'No external vendor recorded in this synthetic intake.',
			recordedDecision: recorded('A. Rivera', '2026-09-01T13:10:00Z')
		},
		human_accountability: {
			status: 'Satisfied',
			owner: 'S. Patel',
			notes: 'Named clinician owner recorded.',
			recordedDecision: recorded('A. Rivera', '2026-09-01T13:15:00Z')
		},
		audit_logging_readiness: {
			status: 'Satisfied',
			owner: 'S. Patel',
			notes: 'Audit/logging expectation recorded for the proposed workspace.',
			recordedDecision: recorded('S. Patel', '2026-09-01T14:00:00Z')
		},
		retention_residency_review: {
			status: 'Satisfied',
			owner: 'A. Rivera',
			notes: 'Retention/residency expectation recorded. Not a legal opinion.',
			recordedDecision: recorded('A. Rivera', '2026-09-01T14:05:00Z')
		}
	}),
	notes: 'Synthetic Risk Review example. Open required gates make readiness Blocked; lifecycle stays Risk Review.',
	aiSuggestions: [
		{
			kind: 'preliminary_classification',
			text: 'Suggested classification: PHI described (synthetic notes). Recorded classification matches after human acceptance.'
		},
		{
			kind: 'risk_indicator',
			text: 'Possible indicators: persistent storage and described PHI. Flags only; not a compliance result.'
		}
	],
	lastUpdated: '2026-09-04T16:30:00Z'
};

const CLAIMS_DOCUMENT_TRIAGE: Initiative = {
	id: 'syn-claims-document-triage',
	name: 'Claims-document triage pilot',
	problemOutcome: 'Staff sort synthetic claims documents into work queues that could be pre-routed.',
	intendedUsers: 'Operations coordinators in a limited synthetic pilot',
	syntheticDataDescription: 'Synthetic claims document filenames and queue labels. Not real claims or members.',
	toolsVendors: 'Fictional vendor “Northwind Document Routing”',
	owner: 'L. Nguyen',
	sponsor: 'A. Rivera',
	successSignal: 'Queue assignment matches the coordinator’s accepted route on sampled synthetic documents.',
	knownConstraints: 'External vendor is in play; BAA/vendor review was recorded as Satisfied by a named human.',
	lifecycleState: 'In Pilot',
	readiness: 'Clear',
	classification: 'PII described',
	gates: createGates({
		security_readiness: {
			status: 'Satisfied',
			owner: 'L. Nguyen',
			notes: 'Synthetic recorded control status. Not a compliance determination.',
			recordedDecision: recorded('L. Nguyen', '2026-07-10T12:00:00Z')
		},
		storage_tool_approval: {
			status: 'Satisfied',
			owner: 'L. Nguyen',
			notes: 'Proposed vendor tool recorded as approved in this synthetic record.',
			recordedDecision: recorded('A. Rivera', '2026-07-10T12:10:00Z')
		},
		data_sensitivity_review: {
			status: 'Satisfied',
			owner: 'A. Rivera',
			notes: 'Working classification recorded as PII described.',
			recordedDecision: recorded('A. Rivera', '2026-07-11T09:00:00Z')
		},
		baa_vendor_review: {
			status: 'Satisfied',
			owner: 'L. Nguyen',
			notes: 'Vendor/BAA review recorded as Satisfied by L. Nguyen. Not a legal conclusion.',
			recordedDecision: recorded('L. Nguyen', '2026-07-12T11:00:00Z')
		},
		human_accountability: {
			status: 'Satisfied',
			owner: 'L. Nguyen',
			notes: 'Named owner recorded for consequential decisions.',
			recordedDecision: recorded('A. Rivera', '2026-07-12T11:15:00Z')
		},
		audit_logging_readiness: {
			status: 'Satisfied',
			owner: 'L. Nguyen',
			notes: 'Audit/logging expectation recorded.',
			recordedDecision: recorded('L. Nguyen', '2026-07-12T14:00:00Z')
		},
		retention_residency_review: {
			status: 'Satisfied',
			owner: 'A. Rivera',
			notes: 'Retention/residency expectation recorded.',
			recordedDecision: recorded('A. Rivera', '2026-07-12T14:10:00Z')
		}
	}),
	notes: 'Synthetic In Pilot example. No applicable required gate remains Open.',
	aiSuggestions: [
		{
			kind: 'intake_summary',
			text: 'Synthetic claims-document routing pilot with a recorded external vendor.'
		},
		{
			kind: 'leadership_draft',
			text: 'In Pilot; readiness Clear. Draft only; not a launch recommendation beyond recorded state.'
		}
	],
	lastUpdated: '2026-09-02T08:45:00Z'
};

const PATIENT_OUTREACH_DRAFTING: Initiative = {
	id: 'syn-patient-outreach-drafting',
	name: 'Patient outreach drafting assistant',
	problemOutcome: 'Coordinators draft outreach messages that could start from a template over synthetic contact lists.',
	intendedUsers: 'Outreach coordinators in a limited synthetic review',
	syntheticDataDescription: 'Synthetic contact list fields and draft message templates. Not real patients or messages.',
	toolsVendors: 'Proposed outbound messaging workspace (not implemented)',
	owner: 'K. Okonkwo',
	sponsor: 'A. Rivera',
	successSignal: 'Every draft is edited or approved by a named human before any send action (send is out of scope).',
	knownConstraints: 'Outbound messaging and retention/residency remain Open. Accountability gate remains Open.',
	lifecycleState: 'Risk Review',
	readiness: 'Blocked',
	classification: 'PII described',
	gates: createGates({
		security_readiness: {
			status: 'Satisfied',
			owner: 'K. Okonkwo',
			notes: 'Synthetic recorded control status. Not a compliance determination.',
			recordedDecision: recorded('K. Okonkwo', '2026-09-03T10:00:00Z')
		},
		storage_tool_approval: {
			status: 'Satisfied',
			owner: 'K. Okonkwo',
			notes: 'Proposed workspace recorded as the tool under review.',
			recordedDecision: recorded('K. Okonkwo', '2026-09-03T10:10:00Z')
		},
		data_sensitivity_review: {
			status: 'Satisfied',
			owner: 'A. Rivera',
			notes: 'Working classification recorded as PII described.',
			recordedDecision: recorded('A. Rivera', '2026-09-03T11:00:00Z')
		},
		baa_vendor_review: {
			status: 'Not Applicable',
			owner: 'A. Rivera',
			notes: 'No external vendor recorded in this synthetic intake.',
			recordedDecision: recorded('A. Rivera', '2026-09-03T11:05:00Z')
		},
		human_accountability: {
			status: 'Open',
			owner: 'K. Okonkwo',
			notes: 'Named person exists on the record, but the accountability gate has not been marked Satisfied.'
		},
		audit_logging_readiness: {
			status: 'Satisfied',
			owner: 'K. Okonkwo',
			notes: 'Audit/logging expectation recorded.',
			recordedDecision: recorded('K. Okonkwo', '2026-09-03T12:00:00Z')
		},
		retention_residency_review: {
			status: 'Open',
			owner: 'A. Rivera',
			notes: 'Retention/residency review remains Open because outbound drafts imply a store/transfer question.'
		}
	}),
	notes: 'Synthetic Blocked example. Lifecycle remains Risk Review; resolving gates would not advance it.',
	aiSuggestions: [
		{
			kind: 'risk_indicator',
			text: 'Possible indicators: outbound contact and described PII. Flags only.'
		},
		{
			kind: 'missing_information',
			text: 'human_accountability and retention_residency_review are Open. Suggestion only.'
		}
	],
	lastUpdated: '2026-09-05T17:20:00Z'
};

export const SYNTHETIC_INITIATIVES: readonly Initiative[] = [
	INTERNAL_POLICY_ASSISTANT,
	SCHEDULING_ASSISTANT,
	CLINICAL_NOTE_SUMMARIZATION,
	CLAIMS_DOCUMENT_TRIAGE,
	PATIENT_OUTREACH_DRAFTING
];
