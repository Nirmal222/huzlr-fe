import {
  IconBrandApple,
  IconBrandGoogle,
  IconBrandWindows,
  IconBrandStripe,
  IconBrandSlack,
  IconBrandGithub,
  IconBrandNetflix,
  IconBrandVercel,
} from "@tabler/icons-react"

export function LogoCloud() {
  const companies = [
    { name: "Microsoft", icon: <IconBrandWindows className="h-8 w-8" /> },
    { name: "Google", icon: <IconBrandGoogle className="h-8 w-8" /> },
    { name: "Apple", icon: <IconBrandApple className="h-8 w-8" /> },
    { name: "Stripe", icon: <IconBrandStripe className="h-8 w-8" /> },
    { name: "Slack", icon: <IconBrandSlack className="h-8 w-8" /> },
    { name: "GitHub", icon: <IconBrandGithub className="h-8 w-8" /> },
    { name: "Netflix", icon: <IconBrandNetflix className="h-8 w-8" /> },
    { name: "Vercel", icon: <IconBrandVercel className="h-8 w-8" /> },
  ]

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-4 gap-8 md:grid-cols-8 md:gap-12">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex h-16 w-16 items-center justify-center text-muted-foreground/40 transition-colors duration-300 hover:text-muted-foreground/80"
            title={company.name}
          >
            {company.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
