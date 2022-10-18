import OutlinedInput from "../components/OutlinedInput";


export function KeyField(props) {
  return <OutlinedInput
    label="Key"
    icon="eye"
    keyboardType="password"
    secureTextEntry
    {...props} />;
}
