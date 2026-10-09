import type { ImageData } from "../lib/image"
import { withPage } from "../lib/site"
import * as React from "react"
import { type HeadFC, type PageProps } from "../lib/site"
import { BlogPostTemplate } from "../components/BlogPostTemplate"
import { Seo, seoDefaults } from "../components/Seo"

interface BlogPostPageData {
  markdownRemark: {
    excerpt: string
    html: string
    frontmatter: {
      date: string
      datePublished: string
      slug: string
      title: string
      author: string
      featuredImage?: ImageData
    }
  }
}

const BlogPostPage: React.FC<PageProps<BlogPostPageData>> = ({ data }) => (
  <BlogPostTemplate data={data} />
)

export const Head: HeadFC<BlogPostPageData> = ({ data }) => {
  if (!data?.markdownRemark) return <></>

  const post = data.markdownRemark
  const slug = post.frontmatter.slug
  const pathname = `/blog${slug}`
  const image = post.frontmatter.featuredImage?.publicURL
  const absoluteImage = image ? `${seoDefaults.siteUrl}${image}` : undefined

  const topicConfig: Record<
    string,
    {
      title?: string
      description?: string
      keywords: string[]
      about: string[]
      faq?: Array<{ q: string; a: string }>
      extraImages?: string[]
    }
  > = {
    "/securing-autonomy": {
      keywords: [
        "agentic AI security",
        "execution-time authorization",
        "Agent Permission Protocol",
        "LangGraph security",
        "AI agent governance",
      ],
      about: [
        "Agent Permission Protocol",
        "LangGraph",
        "execution-time authority",
        "cryptographic policy verification",
      ],
      faq: [
        {
          q: "What is APP in one line?",
          a: "APP is a cryptographic authorization layer for autonomous agent actions.",
        },
        {
          q: "Can LangGraph alone secure autonomy?",
          a: "No. LangGraph orchestrates reasoning and flow, while APP enforces execution-time authority.",
        },
        {
          q: "What is the core enforcement rule?",
          a: "No tool action should execute without an explicit, verifiable, encrypted policy.",
        },
      ],
      extraImages: [
        `${seoDefaults.siteUrl}/images/blog/securing-autonomy-authority-flow.svg`,
        `${seoDefaults.siteUrl}/images/blog/securing-autonomy-langgraph-vs-app.svg`,
      ],
    },
    "/verifiably-human-part-1": {
      keywords: [
        "verifiable human content",
        "AI content provenance",
        "synthetic media authenticity",
        "human provenance infrastructure",
        "blockchain and AI trust",
      ],
      about: [
        "content provenance",
        "synthetic media",
        "human authenticity verification",
        "agentic trust infrastructure",
      ],
      faq: [
        {
          q: "What problem does Verifiably Human solve?",
          a: "It addresses provenance by making human presence at creation explicit and verifiable.",
        },
        {
          q: "Why is detection alone not enough?",
          a: "Detection is an arms race. Provenance requires explicit proof of origin, not inference.",
        },
        {
          q: "What does provably human require?",
          a: "Proof at capture, cryptographic sealing, lineage through edits, and visible tool intervention.",
        },
      ],
    },
    "/verifiably-human-part-2": {
      keywords: [
        "ambient authority",
        "human provenance",
        "Agent Permission Protocol",
        "execution-time authorization",
        "content provenance infrastructure",
        "scoped human authority",
      ],
      about: [
        "ambient authority",
        "Agent Permission Protocol",
        "human provenance as authority",
        "capability-based trust",
        "content origin verification",
      ],
      faq: [
        {
          q: "What is ambient authority and why is it dangerous?",
          a: "Ambient authority is the assumption that identity implies permission. In agentic AI systems, it allows agents to act indefinitely under human credentials without per-action authorization.",
        },
        {
          q: "How does APP address human provenance?",
          a: "APP treats human origin as an explicit, scoped, time-bound, cryptographically sealed claim—governed by authority, not identity.",
        },
        {
          q: "What are human provenance scopes?",
          a: "Graded authority levels such as human.captured, human.authored, human.approved, and ai.assisted that make hybrid workflows transparent instead of deceptive.",
        },
        {
          q: "Why must human provenance claims expire?",
          a: "Because permanent claims are indistinguishable from ambient authority. Keys can be compromised, devices resold, and consent can change.",
        },
      ],
    },
    "/verifiably-human-part-3": {
      keywords: [
        "human provenance policy",
        "cryptographic sealing",
        "sign then encrypt",
        "revocation registry",
        "agentic trust",
        "capability-based authority",
      ],
      about: [
        "human provenance",
        "content authenticity",
        "cryptographic receipts",
        "revocation and expiry",
      ],
      faq: [
        {
          q: "What is a Human Provenance Policy (HPP)?",
          a: "A cryptographically signed and encrypted artifact that grants scoped authority to assert a specific human-origin claim over a specific piece of content.",
        },
        {
          q: "Why sign then encrypt?",
          a: "Sign-then-encrypt preserves integrity, confidentiality, and non-repudiation; encrypting first makes signature verification ambiguous, signing without encryption leaks scope and metadata.",
        },
        {
          q: "Why must human-origin claims expire?",
          a: "Keys compromise, devices change hands, and consent shifts; permanent claims recreate ambient authority. Short TTLs force revalidation.",
        },
        {
          q: "What triggers revocation?",
          a: "Issuer key revocation, disputed artifact hashes, or scope downgrades; revocation must be globally observable.",
        },
      ],
    },
    "/the-organizational-singularity": {
      keywords: [
        "Organizational Singularity",
        "AI Strategy",
        "Future of Work",
        "Claudeonomics",
        "AI Agents",
        "Orchestrator",
        "WUN.ai",
        "Agent Permission Protocol",
        "Sovereign Operator",
      ],
      about: [
        "Organizational Singularity",
        "AI Strategy",
        "unit economics of AI",
        "AI fleet orchestration",
        "WUN.ai",
        "Agent Permission Protocol",
      ],
      faq: [
        {
          q: "What is the Organizational Singularity?",
          a: "The moment when one person plus a fleet of AI agents can outcompete a traditional organization with millions in overhead.",
        },
        {
          q: "What is WUN.ai's role in the Organizational Singularity?",
          a: "WUN.ai provides the infrastructure for the 'Sovereign Operator,' enabling solo entrepreneurs to run secure, bounded agent fleets.",
        },
        {
          q: "How does the Agent Permission Protocol (APP) help?",
          a: "APP provides execution-time certainty, cryptographically binding agent permissions to human intent to prevent authority drift.",
        },
      ],
    },
    "/labor-day-ai-future-of-work-human-agency": {
      keywords: [
        "human agency AI",
        "future of work",
        "human AI interaction",
        "AI agents",
        "intentional delegation",
        "human in the loop",
        "AI governance",
        "Labor Day AI",
      ],
      about: [
        "Human Agency",
        "Future of Work",
        "Human–AI Interaction",
        "Intentional Delegation",
        "AI Agent Governance",
      ],
      faq: [
        {
          q: "What is human agency in AI systems?",
          a: "Human agency is the practical ability to make meaningful choices about what an AI system may do, understand its behavior, intervene before irreversible consequences occur, and retain ownership and judgment over consequential outcomes.",
        },
        {
          q: "How should humans work with AI agents without losing agency?",
          a: "Humans should work with AI agents through intentional delegation rather than uncritical automation. This requires systems designed with explicit execution boundaries, understandable rationale, runtime checkpoints for high-impact actions, and clear recovery paths rather than rubber-stamp approval dialogs.",
        },
        {
          q: "What does human agency mean in the future of work?",
          a: "In the future of work, human agency means ensuring that eliminating mechanical labor does not eliminate human judgment. Workers remain empowered to determine boundaries of delegation, question autonomous reasoning, and direct the purpose of the tools serving them.",
        },
      ],
    },
    "/generated-ai-interfaces-what-must-stay-fixed": {
      keywords: [
        "AI-generated interfaces",
        "generative UI",
        "HCI invariants",
        "predictable interfaces",
        "Solaris Interface World Model",
        "accessibility in AI UI",
        "human agency in UI",
        "UI governance",
      ],
      about: [
        "AI-Generated Interfaces",
        "Human-Computer Interaction (HCI)",
        "Predictable UX & UI Invariants",
        "Interface World Models",
        "Accessibility & Semantics",
        "Authority Layer",
      ],
      faq: [
        {
          q: "What is an AI-generated interface?",
          a: "An interface whose visuals or behavior are produced dynamically by AI rather than fully predefined in code.",
        },
        {
          q: "Are generated interfaces accessible?",
          a: "Only if they expose durable semantic structure to assistive technology; a visual stream alone is insufficient.",
        },
      ],
    },
    "/trust-stack-provenance-spectrum-pol-c2pa": {
      title: "Can C2PA Prove Human Creativity? | The Trust Stack",
      description:
        "A practical look at .pol, C2PA and why provenance needs platform support and human meaning.",
      keywords: [
        "Trust Stack",
        "provenance spectrum",
        "C2PA",
        "Proof of Life",
        "pol file format",
        "content credentials",
        "human creativity",
        "synthetic media provenance",
        "will.i.am",
      ],
      about: [
        "Content Provenance",
        "C2PA Specification",
        "Proof of Life (.pol)",
        "Durable Content Credentials",
        "Human Provenance Spectrum",
        "The Trust Stack",
      ],
      faq: [
        {
          q: "Does C2PA prove an image is real?",
          a: "It verifies provenance and tamper evidence, not the depicted event.",
        },
        {
          q: "Can credentials be removed?",
          a: "Embedded credentials can separate; durable credentials aid recovery.",
        },
        {
          q: "Does human involvement prove ownership?",
          a: "No. Participation, authorship, ownership, consent and authority differ.",
        },
      ],
    },
    "/trust-stack-proof-of-personhood-vs-authority": {
      title: "Proof of Personhood vs. Proof of Authority | Trust Stack",
      description:
        "Proof of personhood can establish uniqueness without revealing identity. It cannot, by itself, show what a person or AI agent is allowed to do.",
      keywords: [
        "Trust Stack",
        "proof of personhood",
        "proof of authority",
        "World ID",
        "World whitepapers",
        "W3C DID",
        "ambient authority",
        "agentic trust",
        "capability-based security",
      ],
      about: [
        "Proof of Personhood",
        "Proof of Authority",
        "World ID",
        "W3C Decentralized Identifiers (DID)",
        "Ambient Authority",
        "The Trust Stack",
      ],
      faq: [
        {
          q: "What does proof of personhood prove?",
          a: "Evidence that a participant is a unique human.",
        },
        {
          q: "What is the difference between authentication and authorization?",
          a: "One proves control; the other determines permission.",
        },
        {
          q: "Can proof of personhood stop AI agents?",
          a: "It can gate actions to humans, but a human may direct an agent.",
        },
      ],
    },
    "/trust-stack-hardware-capture-attestation": {
      title: "Can Secure Cameras Prove a Photo Is Real? | Trust Stack",
      description:
        "Hardware capture can anchor media to a device and moment. It cannot prove the scene is true or its use is authorized.",
      keywords: [
        "Trust Stack",
        "silicon root of trust",
        "hardware capture attestation",
        "Content Credentials",
        "C2PA",
        "Leica M11-P",
        "Sony Camera Authenticity",
        "Truepic",
        "Starling Lab",
        "synthetic media",
        "secure capture",
      ],
      about: [
        "Hardware Capture Attestation",
        "Silicon Root of Trust",
        "Content Credentials",
        "C2PA",
        "Camera Authenticity",
        "The Trust Stack",
      ],
      faq: [
        {
          q: "Can C2PA prove truth?",
          a: "No; it verifies provenance claims.",
        },
        {
          q: "What is capture attestation?",
          a: "Signed evidence about capture.",
        },
        {
          q: "Can a verified camera photograph a deepfake?",
          a: "Yes.",
        },
        {
          q: "Does missing provenance mean fake?",
          a: "No.",
        },
      ],
    },
    "/where-should-ai-end-creative-work": {
      title: "How to Use AI Without Losing Creative Agency",
      description:
        "A five-year study of digital painters suggests the healthiest AI workflow is not all-human or all-AI, but built around boundaries creators can revise.",
      keywords: [
        "creative agency",
        "human-AI interaction",
        "digital painters AI",
        "authorship boundaries",
        "longitudinal agency partitioning",
        "content provenance",
        "The Trust Stack",
        "HCI",
      ],
      about: [
        "Creative Agency",
        "Human–AI Interaction",
        "Content Provenance",
        "Authorship Boundaries",
        "Digital Painting Workflows",
        "The Trust Stack",
      ],
      faq: [
        {
          q: "What is creative agency in AI workflows?",
          a: "Setting goals, deciding delegation, and retaining final responsibility across the workflow.",
        },
        {
          q: "Does using AI erase authorship?",
          a: "Not necessarily; contribution, control, stage-level human involvement, and context matter far more than binary labels.",
        },
        {
          q: "What is a human-only zone?",
          a: "A specific stage, asset, or decision (such as the initial sketch, facial features, or final polish pass) explicitly reserved for human execution and protected from automated AI transformation.",
        },
      ],
    },
    "/autonomous-systems-controls-that-push-back": {
      title: "Why Autonomous Systems Need Controls That Push Back",
      description:
        "As automation moves into the background, interfaces must make system state legible and preserve a reliable path to intervention.",
      keywords: [
        "autonomous systems controls",
        "physically stateful interfaces",
        "human-AI interaction",
        "human agency",
        "execution-time intervention",
        "Agent Permission Protocol",
        "Authority Layer",
        "HCI",
      ],
      about: [
        "Autonomous Systems",
        "Physically Stateful Interfaces",
        "Human-AI Interaction (HCI)",
        "Human Agency",
        "Authority Layer",
        "Execution-Time Intervention",
      ],
      faq: [
        {
          q: "What is a physically stateful interface?",
          a: "A control whose state changes to communicate or constrain automation.",
        },
        {
          q: "Why do autonomous systems need overrides?",
          a: "They can continue acting after the initiating command.",
        },
        {
          q: "Can digital controls use the idea?",
          a: "Yes: preserve legible state, feedforward and dependable intervention.",
        },
      ],
    },
    "/beyond-the-badge-capability-based-provenance": {
      title: "Beyond the Badge: Capability-Based Provenance | Gerardo Iornelas",
      description:
        "Provenance shows where media came from. It cannot grant permission. A human-first model for explicit, scoped and revocable authority.",
      keywords: [
        "Trust Stack",
        "capability-based provenance",
        "content credentials",
        "C2PA",
        "W3C Verifiable Credentials",
        "RFC 9396",
        "Rich Authorization Requests",
        "ambient authority",
        "Agent Permission Protocol",
        "Authority Layer",
        "consequential boundary",
      ],
      about: [
        "Capability-Based Provenance",
        "Content Credentials",
        "C2PA",
        "W3C Verifiable Credentials",
        "OAuth Rich Authorization Requests (RFC 9396)",
        "Authority Layer",
        "The Trust Stack",
      ],
      faq: [
        {
          q: "What is capability-based provenance?",
          a: "A model where origin records (provenance) are coupled with explicit, scoped, time-bound, and revocable permissions (capabilities) governing what actors may do with an asset.",
        },
        {
          q: "Can Content Credentials grant permission?",
          a: "No. Content Credentials and C2PA manifests record origin and transformation history; they do not convey authorization or legal permission to distribute, license, or execute actions.",
        },
        {
          q: "How is authority different from identity?",
          a: "Identity proves who or what an actor is. Authority specifies what that actor is permitted to do in a specific context on a specific asset.",
        },
        {
          q: "Does this require blockchain?",
          a: "No. Blockchain is optional for multi-party decentralized settlement or public revocation, but signed registries and centralized policy enforcement layers can execute capability checks without a distributed ledger.",
        },
      ],
    },
    "/ai-rehearsal-after-interface": {
      title: "AI as Rehearsal: What Happens After the Interface",
      description:
        "A field experiment suggests AI’s most important effect may appear after the screen is gone—in what people feel able to do without it.",
      keywords: [
        "AI as rehearsal",
        "human-AI interaction",
        "HCI",
        "transfer beyond the interface",
        "active student engagement",
        "voice AI discussion partner",
        "residual value",
        "human agency",
        "afterlife metric",
      ],
      about: [
        "Human–AI Interaction (HCI)",
        "AI as Rehearsal",
        "Transfer Beyond the Interface",
        "Active Student Engagement",
        "Human Agency",
        "Residual Value",
      ],
      faq: [
        {
          q: "Does practicing with AI improve learning?",
          a: "This study found greater later class participation and perceived learning, not proof of durable learning. The distinction should remain explicit.",
        },
        {
          q: "Should AI replace human discussion practice?",
          a: "No. The strongest use case is rehearsal that prepares a person for human participation, not substitution for the human setting.",
        },
      ],
    },
  }

  const topic = topicConfig[slug] ?? {
    keywords: ["AI security", "blockchain", "agentic systems"],
    about: ["AI security", "cryptographic controls"],
  }

  const resolvedTitle = topic.title ?? post.frontmatter.title
  const resolvedDescription = topic.description ?? post.excerpt

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.datePublished,
    dateModified: post.frontmatter.datePublished,
    inLanguage: "en-US",
    description: resolvedDescription,
    keywords: topic.keywords.join(", "),
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Gerardo I. Ornelas",
      url: seoDefaults.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${seoDefaults.siteUrl}/brand.png`,
      },
    },
    mainEntityOfPage: `${seoDefaults.siteUrl}${pathname}`,
    image: [absoluteImage, ...(topic.extraImages ?? [])].filter(Boolean),
    about: topic.about.map(name => ({
      "@type": "Thing",
      name,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: seoDefaults.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${seoDefaults.siteUrl}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${seoDefaults.siteUrl}${pathname}`,
      },
    ],
  }

  const faqSchema = topic.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: topic.faq.map(item => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null

  return (
    <Seo
      title={resolvedTitle}
      description={resolvedDescription}
      pathname={pathname}
      image={image}
      type="article"
      jsonLd={[articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
    />
  )
}


export default withPage(BlogPostPage)
