import React, { useEffect, useState } from 'react';
import { SafeAreaView ,StatusBar,Text,TouchableOpacity,View,useColorScheme} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NfcManager, { Ndef, NfcEvents, NfcTech } from 'react-native-nfc-manager';

function NfcView(): JSX.Element {
    const [hasNfc, setHasNFC ] = useState<boolean|null>(null);
    useEffect(() => {
        const checkIsSupported = async () => {
        const deviceIsSupported = await NfcManager.isSupported()
        setHasNFC(deviceIsSupported)
        if (deviceIsSupported) {
            await NfcManager.start()
        }
        }
        checkIsSupported()
    }, []);

    useEffect(() => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
            console.log('tag found')
            console.log(tag);
        });

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        }
    }, [])

    const readTag = async () => {
        await NfcManager.registerTagEvent();
    }
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };
    if (hasNfc === null) return <></>;

  if (!hasNfc) {
    return (
        <SafeAreaView>
        <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="powderblue"
      />
      <View style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <Text>NFC not supported</Text>
      </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello world</Text>
        <TouchableOpacity style={{}} onPress={readTag}>
            <Text style={{ color: "white" }}>Scan Tag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => console.log('cancel')}>
            <Text style={{ color: "white" }}>Cancel Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={writeNFC}>
            <Text style={{ color: "white" }}>Write Tag</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
    const writeNFC = async() => {
        let result = false;
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.uriRecord('https://blog.logrocket.com/')]);

            if (bytes) {
                await NfcManager.ndefHandler
                .writeNdefMessage(bytes);
                result = true;
            }
        } catch (ex) {
            console.warn(ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }

        return result;
    }

  export default NfcView;