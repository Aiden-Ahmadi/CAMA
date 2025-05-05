import { COLORS, SPACING } from "../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: SPACING.md,
  },
  inputContainer: {
    width: "100%",
    marginBottom: SPACING.md,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.sm,
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.info,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: COLORS.info,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  signUpButtonText: {
    color: COLORS.info,
    fontSize: 16,
    fontWeight: "bold",
  },
});
