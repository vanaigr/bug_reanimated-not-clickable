import R from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    //Animated
} from "react-native"
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    runOnJS,
} from 'react-native-reanimated'

export default function() {
    const [visible, setVisible] = R.useState(false)

    return <View style={{ padding: 100 }}>
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Text>Open</Text>
        </TouchableOpacity>
        <AddModal visible={visible} onClose={() => setVisible(false)}/>
    </View>
}

function AddModal({ visible, onClose }: any) {
    return (
        <Modal2
            visible={visible}
            close={() => onClose(null)}
        >
            <View style={{ backgroundColor: 'white' }}>
                <View>
                    <View>
                        <Text>text</Text>
                    </View>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    style={{ height: 250 }}
                >
                    <View>
                        <View/><View/><View/><View/><View/>
                        <View/><View/><View/><View/><View/>
                        <View/><View/><View/><View/><View/>
                        <View/><View/><View/><View/><View/>
                        <View/><View/><View/><View/><View/>
                    </View>
                </ScrollView>

                <View>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="0"
                        value='15'
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={() => onClose(null)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClose(null)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal2>
    )
}

export type Props = R.PropsWithChildren<{
    visible: boolean
    close: () => void
}>

function Modal2({ visible, close, children }: Props) {
    const animation = useSharedValue(0)
    const [showModal, setShowModal] = R.useState(visible)

    R.useEffect(() => {
        if (visible) {
            animation.value = withTiming(1, { duration: 200 })
            if(!showModal) setShowModal(true)
        } else {
            animation.value = withTiming(0, { duration: 200 }, () => runOnJS(setShowModal)(false))
        }
    }, [visible])

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: animation.value,
    }))

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: `${100 - (animation.value * 100)}%` }],
    }))

    return <Modal
        visible={visible || showModal}
        onRequestClose={close}
        transparent={true}
        statusBarTranslucent={true}
    >
        <View style={{ flex: 1 }}>
            <View style={{ position: 'absolute', inset: 0 }}>
                <Animated.View
                    style={[{ flex: 1, backgroundColor: '#00000080' }, backdropStyle]}
                />
            </View>
            <Animated.View
                style={[{ flex: 1, justifyContent: 'flex-end' }, containerStyle]}
            >
                {children}
            </Animated.View>
        </View>
    </Modal>
}

    /*const off = R.useRef(new Animated.Value(1000)).current
    const [showModal, setShowModal] = R.useState(visible)

    R.useEffect(() => {
        if (visible) {
            Animated.timing(
                off,
                { toValue: 0, duration: 200, useNativeDriver: true }
            ).start()
            if(!showModal) setShowModal(true)
        } else {
            Animated.timing(
                off,
                { toValue: 1000, duration: 200, useNativeDriver: true }
            ).start(() => setShowModal(false))
        }
    }, [visible])

    return <Modal
        visible={visible || showModal}
        onRequestClose={close}
        transparent={true}
        statusBarTranslucent={true}
    >
        <View style={{ flex: 1 }}>
            <View style={{ position: 'absolute', inset: 0 }}>
                <Animated.View
                    style={[{ flex: 1, backgroundColor: '#00000080' }, { opacity: off }]}
                />
            </View>
            <Animated.View
                style={[{ flex: 1, justifyContent: 'flex-end' }, { transform: [{ translateY: off }] }]}
            >
                {children}
            </Animated.View>
        </View>
    </Modal>*/
