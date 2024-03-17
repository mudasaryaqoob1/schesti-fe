import { View } from '@react-pdf/renderer';

export const BG_COLOR = '#6f42c1';
type Props = {
    brandingColor?: string;
};
export function Header({ brandingColor }: Props) {
    return <View
        style={[
            { height: 44 },
            { backgroundColor: brandingColor ? brandingColor : BG_COLOR, position: "absolute", top: 0 },
        ]}
    >

    </View>
}