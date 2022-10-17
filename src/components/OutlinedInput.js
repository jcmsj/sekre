import { TextInput } from 'react-native-paper';

/**
 *
 * @param {import('react-native-paper').TextInputProps} props
 * @returns
 */
export default function OutlinedInput(props) {
  return <TextInput
    mode="outlined"
    {...props} />;
}
