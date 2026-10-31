import { ArrowRightIcon } from "./components/icons";
import { Button, Container } from "./components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-fg">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-sm text-accent">404</p>

        <h1 className="mt-4 text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-base leading-7 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
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
