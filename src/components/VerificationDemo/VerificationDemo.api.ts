export type RiskLevel = "High" | "Elevated" | "Moderate"
export type ReceiptStatus = "executed" | "expired" | "revoked"
export type ProofStatus = "confirmed" | "expired" | "revoked"

export interface ActionRequest {
  id: string
  title: string
  actor: string
  requestedAction: string
  resource: string
  riskLevel: RiskLevel
}

export interface AuthorityGrant {
  grantId: string
  scope: string[]
  constraints: string[]
  expiresAt: string
  approvedBy: string
  policyHash: string
}

export interface ProofReference {
  network: string
  recordType: string
  txIdOrHash: string
  verifierUrl: string
  proofStatus: ProofStatus
}

export interface VerificationReceipt {
  receiptId: string
  status: ReceiptStatus
  executedAt: string
  grantId: string
  proofRef: ProofReference
  revocable: boolean
}

export interface VerificationScenario {
  id: string
  eyebrow: string
  thesis: string
  actionRequest: ActionRequest
  authorityGrant: AuthorityGrant
  verificationReceipt: VerificationReceipt
}

export const verificationScenarios: VerificationScenario[] = [
  {
    id: "protected-document",
    eyebrow: "Protected document transmission",
    thesis:
      "An agent can draft the handoff, but release still depends on an explicit, time-bounded grant.",
    actionRequest: {
      id: "arq_doc_72c1",
      title: "Transmit a protected diligence packet",
      actor: "WUN Operations Agent",
      requestedAction:
        "Send the approved diligence packet to outside counsel for a live matter.",
      resource: "Matter packet / due-diligence / counsel-share",
      riskLevel: "High",
    },
    authorityGrant: {
      grantId: "grant_doc_117a",
      scope: [
        "Transmit one encrypted packet",
        "Limit delivery to outside counsel",
        "Use the approved matter workspace only",
      ],
      constraints: [
        "Single execution only",
        "Expires after 15 minutes",
        "Human reviewer must approve before release",
      ],
      expiresAt: "2026-05-10T14:45:00Z",
      approvedBy: "Matter Reviewer / Human Authority",
      policyHash: "0x8f3c1ba4c9927d41ee24f7aeb9a8d11d5a3372cf",
    },
    verificationReceipt: {
      receiptId: "receipt_doc_482a",
      status: "executed",
      executedAt: "2026-05-10T14:32:18Z",
      grantId: "grant_doc_117a",
      revocable: true,
      proofRef: {
        network: "Hedera-compatible attestation rail",
        recordType: "authorization_receipt",
        txIdOrHash: "0.0.481921@1715341938.447019294",
        verifierUrl: "https://hashscan.io/testnet/transaction/1715341938.447019294",
        proofStatus: "confirmed",
      },
    },
  },
  {
    id: "scoped-settlement",
    eyebrow: "Scoped payment settlement",
    thesis:
      "Funds movement is constrained by counterparty, ceiling, and purpose instead of broad standing access.",
    actionRequest: {
      id: "arq_pay_11de",
      title: "Settle a contractor milestone",
      actor: "Treasury Coordination Agent",
      requestedAction:
        "Release the approved milestone payment for vendor onboarding work.",
      resource: "Treasury / contractor-settlement / vendor-204",
      riskLevel: "Elevated",
    },
    authorityGrant: {
      grantId: "grant_pay_298c",
      scope: [
        "Release one settlement to vendor-204",
        "Cap amount at 4,500 USD equivalent",
        "Restrict destination to registered vendor wallet",
      ],
      constraints: [
        "Grant expires before next accounting cycle",
        "Counterparty must match compliance record",
        "Two-person review required for reissue",
      ],
      expiresAt: "2026-05-09T22:00:00Z",
      approvedBy: "Treasury Controller / Human Authority",
      policyHash: "0x4e13a44bfcb6d9e5e979db2e9d6ef1e48b711a04",
    },
    verificationReceipt: {
      receiptId: "receipt_pay_051c",
      status: "expired",
      executedAt: "2026-05-09T22:14:03Z",
      grantId: "grant_pay_298c",
      revocable: false,
      proofRef: {
        network: "Hedera-compatible attestation rail",
        recordType: "authorization_receipt",
        txIdOrHash: "0.0.481921@1715292843.118775200",
        verifierUrl: "https://hashscan.io/testnet/transaction/1715292843.118775200",
        proofStatus: "expired",
      },
    },
  },
  {
    id: "time-boxed-access",
    eyebrow: "Sensitive workflow access",
    thesis:
      "Access can be issued for a narrow window and later revoked without pretending the original grant never existed.",
    actionRequest: {
      id: "arq_acc_63be",
      title: "Enter a restricted underwriting queue",
      actor: "Underwriting Support Agent",
      requestedAction:
        "Access the regulated underwriting queue to reconcile one escalation.",
      resource: "Underwriting / regulated-queue / escalation-review",
      riskLevel: "High",
    },
    authorityGrant: {
      grantId: "grant_acc_990b",
      scope: [
        "Read one escalation case",
        "No export outside the underwriting queue",
        "No privilege escalation or secondary lookups",
      ],
      constraints: [
        "Window limited to 20 minutes",
        "All actions logged to receipt trail",
        "Grant may be revoked at any time",
      ],
      expiresAt: "2026-05-10T13:20:00Z",
      approvedBy: "Risk Operations Lead / Human Authority",
      policyHash: "0x91d0914d50cf79584bfe181492caee621298fcf7",
    },
    verificationReceipt: {
      receiptId: "receipt_acc_214f",
      status: "revoked",
      executedAt: "2026-05-10T13:09:41Z",
      grantId: "grant_acc_990b",
      revocable: true,
      proofRef: {
        network: "Hedera-compatible attestation rail",
        recordType: "authorization_receipt",
        txIdOrHash: "0.0.481921@1715336981.883410973",
        verifierUrl: "https://hashscan.io/testnet/transaction/1715336981.883410973",
        proofStatus: "revoked",
      },
    },
  },
]
