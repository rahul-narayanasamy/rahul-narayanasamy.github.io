import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="page-head">
        <span className="sec-index" aria-hidden="true">
          404
        </span>
        <p className="eyebrow">Route not found</p>
        <h1>
          Page
          <br />
          missing<span className="type-cursor">_</span>
        </h1>
        <p className="lead">
          <span className="red">&gt;</span> cd .. — that page doesn&apos;t exist. Try the index, or press ⌘K to jump anywhere.
        </p>
        <div style={{ marginTop: 30 }}>
          <Link href="/" className="btn btn-solid">
            Back to index
          </Link>
        </div>
      </header>
    </div>
  );
}
