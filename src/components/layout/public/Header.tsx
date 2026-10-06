import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          DevAssess
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/problems"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Problems
          </Link>

          <Link
            href="/assessments"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Assessments
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
