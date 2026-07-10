import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/utils/helpers";

type HomePageAgentsProps = ComponentProps<"div">;

const HomePageAgents = ({ className, ...props }: HomePageAgentsProps) => {
  const t = useTranslations();

  return (
    <div
      id="agents"
      className={cn(
        "absolute inset-0 overflow-y-auto bg-gray-400 px-6 py-12 font-mono text-sm leading-5 text-gray-100 selection:bg-white selection:text-gray-400 md:px-12 md:py-24",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-xl flex-col gap-16">
        <section className="flex flex-col gap-8">
          <h1 className="text-gray-50">{t("agents.markdown.title")}</h1>

          <div className="flex flex-col gap-2">
            <p className="max-w-lg text-gray-200">{t("agents.intro.p1")}</p>
            <p className="max-w-lg text-gray-200">{t("agents.intro.p2")}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-50">{t("agents.directory.products")}</h3>
            <div>
              <p>
                <a
                  href={t("agents.directory.links.claudebin.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-50"
                >
                  [{t("agents.directory.links.claudebin.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.claudebin.url")})</span>
                </a>
              </p>
              <p>
                <a
                  href={t("agents.directory.links.openable.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-50"
                >
                  [{t("agents.directory.links.openable.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.openable.url")})</span>
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-50">{t("agents.directory.social")}</h3>
            <div>
              <p>
                <a
                  href={t("agents.directory.links.github.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-50"
                >
                  [{t("agents.directory.links.github.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.github.url")})</span>
                </a>
              </p>
              <p>
                <a href={t("agents.directory.links.x.url")} target="_blank" rel="noreferrer" className="text-gray-50">
                  [{t("agents.directory.links.x.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.x.url")})</span>
                </a>
              </p>
              <p>
                <a
                  href={t("agents.directory.links.community.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-50"
                >
                  [{t("agents.directory.links.community.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.community.url")})</span>
                </a>
              </p>
              <p>
                <a
                  href={t("agents.directory.links.events.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-50"
                >
                  [{t("agents.directory.links.events.label")}]
                  <span className="text-gray-200">({t("agents.directory.links.events.url")})</span>
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-gray-50">{t("agents.focus.title")}</h2>

          <article className="flex flex-col gap-2">
            <p className="font-semibold text-gray-50">{t("agents.markdown.harnessesTitle")}</p>
            <p className="max-w-lg text-gray-200">{t("agents.focus.items.harnesses")}</p>
          </article>

          <article className="flex flex-col gap-2">
            <p className="font-semibold text-gray-50">{t("agents.markdown.agenticDevEnvsTitle")}</p>
            <p className="max-w-lg text-gray-200">{t("agents.focus.items.agenticDevEnvs")}</p>
          </article>

          <article className="flex flex-col gap-2">
            <p className="font-semibold text-gray-50">{t("agents.markdown.humanInTheLoopTitle")}</p>
            <p className="max-w-lg text-gray-200">{t("agents.focus.items.humanInTheLoop")}</p>
          </article>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-gray-50">{t("agents.markdown.projectsTitle")}</h2>

          <article className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-50">{t("agents.markdown.claudebinTitle")}</h3>
            <p className="max-w-lg text-gray-200">{t("agents.projects.claudebin.description.p1")}</p>
            <p>
              <a
                href={t("agents.projects.claudebin.website.url")}
                target="_blank"
                rel="noreferrer"
                className="text-gray-50"
              >
                [{t("agents.projects.claudebin.website.label")}]
                <span className="text-gray-200">({t("agents.projects.claudebin.website.url")})</span>
              </a>
            </p>
          </article>

          <article className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-50">{t("agents.markdown.openableTitle")}</h3>
            <p className="max-w-lg text-gray-200">{t("agents.projects.openable.description")}</p>
            <p>
              <a
                href={t("agents.projects.openable.website.url")}
                target="_blank"
                rel="noreferrer"
                className="text-gray-50"
              >
                [{t("agents.projects.openable.website.label")}]
                <span className="text-gray-200">({t("agents.projects.openable.website.url")})</span>
              </a>
            </p>
          </article>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-50">{t("agents.markdown.communityTitle")}</h3>
          <div className="flex flex-col gap-1">
            <p className="max-w-lg text-gray-200">{t("agents.community.description.p1")}</p>
            <p className="max-w-lg text-gray-200">{t("agents.community.description.p2")}</p>
          </div>
          <div>
            <p>
              <a
                href={t("agents.community.links.community.url")}
                target="_blank"
                rel="noreferrer"
                className="text-gray-50"
              >
                [{t("agents.community.links.community.label")}]
                <span className="text-gray-200">({t("agents.community.links.community.url")})</span>
              </a>
            </p>
            <p>
              <a
                href={t("agents.community.links.events.url")}
                target="_blank"
                rel="noreferrer"
                className="text-gray-50"
              >
                [{t("agents.community.links.events.label")}]
                <span className="text-gray-200">({t("agents.community.links.events.url")})</span>
              </a>
            </p>
            <p>
              <a
                href={t("agents.community.links.github.url")}
                target="_blank"
                rel="noreferrer"
                className="text-gray-50"
              >
                [{t("agents.community.links.github.label")}]
                <span className="text-gray-200">({t("agents.community.links.github.url")})</span>
              </a>
            </p>
            <p>
              <a href={t("agents.community.links.x.url")} target="_blank" rel="noreferrer" className="text-gray-50">
                [{t("agents.community.links.x.label")}]
                <span className="text-gray-200">({t("agents.community.links.x.url")})</span>
              </a>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-50">{t("agents.markdown.contactTitle")}</h3>
          <p className="max-w-lg text-gray-200">{t("agents.contact.description")}</p>
          <div>
            <p>
              <a href={t("agents.contact.email.url")} className="text-gray-50">
                [{t("agents.contact.email.label")}]
                <span className="text-gray-200">({t("agents.contact.email.text")})</span>
              </a>
            </p>
            <p>
              <a href={t("agents.contact.website.url")} target="_blank" rel="noreferrer" className="text-gray-50">
                [{t("agents.contact.website.label")}]
                <span className="text-gray-200">({t("agents.contact.website.url")})</span>
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export { HomePageAgents };
