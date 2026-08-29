import { ArrowRightIcon } from "./components/icons";
import { Button, Container } from "./components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-fg">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-sm text-accent">error --code 404</p>

        <h1 className="mt-4 font-mono text-6xl font-medium tracking-tight text-fg sm:text-8xl">
          404
        </h1>

        <p className="mt-4 max-w-md text-base leading-7 text-muted">
          This route doesn&apos;t exist. Whatever you&apos;re looking for isn&apos;t here —
          might be worth heading back home.
        </p>

        <div className="mt-8">
          <Button href="/">
            Back to home
            <ArrowRightIcon width={16} height={16} />
          </Button>
        </div>
      </Container>
    </main>
  );
}
