export const toastStyles = {
  duration: 5000,
  style: {
    background: "var(--neutral-900)",
    color: "var(--neutral-50)",
    fontSize: "var(--20)",
    borderRadius: "var(--8)",
    fontWeight: 600,
  },
  error: {
    style: {
      background: "var(--red-50)",
      border: "var(--4) solid var(--red-500)",
      padding: "var(--16)",
      color: "var(--red-500)",
      boxShadow: "0px 8px 0px 0px rgba(255, 255, 255, 0.50) inset",
    },
    iconTheme: {
      primary: "var(--red-400)",
      secondary: "var(--red-50)",
    },
    duration: 3000,
  },
}
