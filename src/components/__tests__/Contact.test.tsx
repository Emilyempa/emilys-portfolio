
import { render, screen, fireEvent, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Contact } from "../Contact";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock Supabase client
jest.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: jest.fn(),
    },
  },
}));

// Mock useToast
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
    dismiss: jest.fn(),
    toasts: [],
  })),
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockToast = jest.fn();

describe("Contact Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({
      toast: mockToast,
      dismiss: jest.fn(),
      toasts: [],
    });
  });

  it("renders all form elements correctly", () => {
    render(<Contact />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getByText("Send a Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("renders social links correctly", () => {
    render(<Contact />);
    expect(screen.getByText("Connect With Me")).toBeInTheDocument();
    expect(screen.getByText("@EmilyEmpa")).toBeInTheDocument();
    expect(screen.getByText("@Emily Pettersson")).toBeInTheDocument();
  });

  it("shows validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    });
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.type(screen.getByLabelText("Message"), "Test message");

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    });
  });

  it("successfully submits valid form", async () => {
    const user = userEvent.setup();
    mockSupabase.functions.invoke.mockResolvedValue({
      data: { success: true },
      error: null,
    });

    render(<Contact />);
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Message"), "Test message");

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        "send-contact-email",
        {
          body: {
            name: "John Doe",
            email: "john@example.com",
            message: "Test message",
          },
        }
      );
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    });
  });

  it("handles submission error correctly", async () => {
    const user = userEvent.setup();
    mockSupabase.functions.invoke.mockRejectedValue(
      new Error("Network error")
    );

    render(<Contact />);
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Message"), "Test message");

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    });
  });

  it("sanitizes input by removing HTML tags", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const nameInput = screen.getByLabelText("Name");
    await user.type(nameInput, 'John <script>alert("hack")</script> Doe');
    expect(nameInput).toHaveValue('John alert("hack") Doe');
  });

  it("clears form after successful submission", async () => {
    const user = userEvent.setup();
    mockSupabase.functions.invoke.mockResolvedValue({
      data: { success: true },
      error: null,
    });

    render(<Contact />);
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(messageInput, "Test message");

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    });
  });
});
