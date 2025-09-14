import React from "react";
import {
  FileText,
  Scale,
  AlertTriangle,
  Copyright,
  ExternalLink,
  RefreshCw,
  Shield,
} from "lucide-react";

export default function LegalDisclaimer() {
  return (
    <div className="">
      {/* Header */}
      <div className="bg-[#2A2A2A] text-white py-[60px]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center text-center space-x-3">
            <div>
              <h1 className="text-lg font-semibold">Legal Disclaimer Notice</h1>
              <p className="text-sm text-gray-300">
                Important Legal Information - Please Read Carefully
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto ">
        <div className=" p-8">
          <div className="mb-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Articles
            </button>
          </div>
          {/* Warning Banner */}
          <div className="mb-6">
            <h2 className="font-semibold text-[14px] uppercase tracking-wide">
              THIS DISCLAIMER APPLIES TO ALL CONTENT, ARTICLES, RESEARCH,
              ANALYSIS, AND COMMENTARY PROVIDED ON THIS PLATFORM
            </h2>
          </div>

          {/* Document Content */}
          <div className="space-y-8">
            {/* General Disclaimer */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Not Legal Advice
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The information contained in these articles, research papers,
                  case studies, and analytical content is provided for general
                  informational and educational purposes only. This content does
                  not constitute legal advice, professional counsel, or formal
                  legal opinion* and should not be treated as such under any
                  circumstances
                </p>

                <p>
                  The legal principles, case analyses, regulatory discussions,
                  and statutory interpretations presented herein are intended
                  solely to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Provide general background information on legal topics
                  </li>
                  <li>Facilitate academic and educational discourse</li>
                  <li>Offer commentary on legal developments and trends</li>
                  <li>
                    Present hypothetical scenarios for illustrative purposes
                  </li>
                </ul>
              </div>
            </section>

            {/* No Attorney-Client Relationship */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                No Attorney-Client Relationship
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  No attorney-client relationship is created* between the
                  authors, contributors, or publishers of this content and any
                  reader or user. The provision of legal information does not
                  create any confidential, fiduciary, or professional
                  relationship of any kind.
                </p>
              </div>
            </section>

            {/*Individual Circumstances Vary */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Individual Circumstances Vary
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Legal matters are highly fact-specific and depend on the
                  particular circumstances of each situation. The law varies
                  significantly between jurisdictions, changes frequently, and
                  may be interpreted differently by different courts or legal
                  authorities. What applies in one case may not apply in
                  another, even when the facts appear similar.
                </p>
                <p>The content provided:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Cannot account for the specific facts and circumstances of
                    your individual situation
                  </li>
                  <li>
                    May not reflect the most current legal developments or
                    statutory changes
                  </li>
                  <li>
                    Should not be relied upon as a substitute for consultation
                    with qualified legal professionals
                  </li>
                  <li>
                    Does not consider local variations in law, procedure, or
                    judicial interpretation
                  </li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Limitation of Liability
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The authors, contributors, publishers, and distributors of
                  this content expressly disclaim all liability* for any loss,
                  damage, or adverse consequences arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Reliance on any information contained within these materials
                  </li>
                  <li>
                    Actions taken or not taken based on the content provided
                  </li>
                  <li>
                    Any errors, omissions, or inaccuracies in the legal analysis
                    presented
                  </li>
                  <li>Changes in law that occur after publication</li>
                  <li>
                    Misinterpretation or misapplication of the legal principles
                    discussed
                  </li>
                </ul>
              </div>
            </section>

            {/* Professional Legal Advice */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Professional Legal Guidance Required
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you require legal advice or assistance with a specific
                  legal matter, you must consult with a qualified solicitor,
                  barrister, or other appropriate legal professional who is
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Properly licensed to practice law in the relevant
                    jurisdiction
                  </li>
                  <li>
                    Familiar with the specific area of law relevant to your
                    circumstances
                  </li>
                  <li>
                    Able to provide advice tailored to your individual situation
                  </li>
                  <li>
                    Bound by professional duties of care and confidentiality
                  </li>
                </ul>
              </div>
            </section>

            {/* Regulatory and Jurisdictional Variations*/}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Regulatory and Jurisdictional Variations
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The information we offer is specific to particular sectors and
                  jurisdictions. Information may not be suitable for the
                  requirements that apply in other jurisdictions, but it may be
                  that it can be adapted.
                </p>
                <p>
                  It should be noted that local legislation differs
                  significantly between jurisdictions and local legal practice
                  should be obtained.
                </p>
                <p>
                  The content on this website should not be relied upon as legal
                  advice, as circumstances differ enormously.
                </p>
                <p>
                  This information presented does not create Attorney-Client
                  relationship and must not be considered as substituting legal
                  advice for specific situations.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Academic and Educational Purpose
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  This content is published primarily for academic research,
                  educational discourse, and professional development within the
                  legal community. While every effort is made to ensure
                  accuracy, the materials are:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Subject to interpretation and debate within the legal
                    profession
                  </li>
                  <li>
                    Presented from particular analytical perspectives that may
                    not be universally accepted
                  </li>
                  <li>
                    Intended to stimulate thought and discussion rather than
                    provide definitive answers
                  </li>
                  <li>
                    Not intended as comprehensive coverage of any legal topicy
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Currency and Accuracy
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Legal information becomes outdated quickly. Statutes are
                  amended, regulations are revised, and judicial decisions
                  create new precedents regularly. While efforts are made to
                  keep content current, *no guarantee is provided* that the
                  information reflects the most recent legal developments at the
                  time of your reading.
                </p>
                <p>*Users should:*</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Verify the current status of any legal authorities cited
                  </li>
                  <li>Check for recent amendments to relevant legislation</li>
                  <li>Confirm that judicial decisions remain good law</li>
                  <li>
                    Consult current legal databases and professional resources
                  </li>
                </ul>
              </div>
            </section>

            <section className="">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Professional Standards
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The authors and contributors maintain professional standards in
                preparing this content, but{" "}
                <strong>
                  "this does not constitute a professional service
                  relationship."
                </strong>{" "}
                The materials are not subject to the same quality controls,
                professional insurance coverage, or regulatory oversight that
                would apply to formal legal services.
              </p>
            </section>

            {/* Third-Party Content and Links */}
            <section className="">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Third-Party Content and Links
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Where this content references third-party sources, external
                websites, or other materials, these references are provided for
                convenience only. <strong>No endorsement is implied,</strong>
                and users access such materials at their own risk. External
                sources may contain inaccurate information, outdated analysis,
                or views that conflict with the content provided here.
              </p>
            </section>

            {/* Intellectual Property Rights */}
            <section className="">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Intellectual Property Rights
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This content is protected by copyright and other intellectual
                property rights. While it may be shared for educational and
                discussion purposes,
                <strong>
                  commercial use or reproduction without permission is
                  prohibited.
                </strong>
                Users must respect applicable copyright restrictions and fair
                dealing provisions.
              </p>
            </section>

            {/* Updates and Modifications */}
            <section className="">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Updates and Modifications
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This disclaimer may be updated periodically to reflect changes
                in legal practice, regulatory requirements, or operational
                procedures.
                <strong>
                  Continued use of this content following any modifications
                  constitutes acceptance of the revised terms.
                </strong>
              </p>
            </section>

            {/* Governing Law */}
            <section className="">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Governing Law
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This disclaimer and any disputes arising from the use of this
                content shall be governed by and construed in accordance with
                the laws of the Federal Republic of Nigeria.
              </p>
              <p className="text-gray-600 text-sm text-left font-bold mt-2">
                ---
              </p>
            </section>

            {/* Important Acknowledgment */}
            <section className="">
              <div className="flex items-start space-x-3">
                <div className="space-y-4">
                  <p className="text-gray-900 font-bold text-lg leading-relaxed">
                    BY ACCESSING, READING, OR USING ANY PART OF THIS CONTENT,
                    YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO
                    BE BOUND BY THIS DISCLAIMER IN ITS ENTIRETY.
                  </p>

                  <div className="pt-4">
                    <p className="text-gray-900 font-bold leading-relaxed">
                      IF YOU DO NOT AGREE WITH ANY PART OF THIS DISCLAIMER, YOU
                      SHOULD NOT ACCESS OR USE THIS CONTENT.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Information */}
            <section className="">
              <p className="text-gray-600 text-sm text-left font-bold">---</p>
              <p className="text-gray-700 text-sm mt-2">
                This disclaimer was last updated on 14th September 2025 and
                applies to all content published on this platform unless
                specifically stated otherwise.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
