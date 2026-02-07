import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

vi.mock("../components/ParticleBackground", () => ({ default: () => <div data-testid="particle-bg" /> }));
vi.mock("../components/CursorGlow", () => ({ default: () => <div data-testid="cursor-glow" /> }));
vi.mock("@vercel/analytics/react", () => ({ Analytics: () => <div data-testid="analytics" /> }));
vi.mock("@/components/ui/toaster", () => ({ Toaster: () => <div data-testid="toaster" /> }));
vi.mock("@/components/ui/sonner", () => ({ Toaster: () => <div data-testid="sonner" /> }));
vi.mock("@/components/ui/tooltip", () => ({ TooltipProvider: ({ children }: any) => <div>{children}</div> }));
vi.mock("../components/Navbar", () => ({ default: () => <div data-testid="navbar" /> }));
vi.mock("../components/Footer", () => ({ default: () => <div data-testid="footer" /> }));

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
