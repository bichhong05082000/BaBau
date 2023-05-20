import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {
    State, useTrackPlayerEvents,
} from 'react-native-track-player';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPlayAudioProps {
    music: premium.MusicPremium;
}

import { setupPlayer, addTracks } from 'services/trackPlayer';

function PlayAudio(props: IPlayAudioProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { music } = props;
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        async function setup() {
            let isSetup = await setupPlayer();
            await TrackPlayer.reset();

            await TrackPlayer.setVolume(1);

            setIsPlayerReady(isSetup);
        }

        setup();
        return () => {
            TrackPlayer.reset();
            TrackPlayer.remove(0)
        }

    }, [music]);

    const handlePlayPress = async () => {

        if (await TrackPlayer.getState() == State.Playing) {
            TrackPlayer.pause();
            setPlaying(false);
        } else {
            setPlaying(true);
            await TrackPlayer.add({
                id: `${Math.random()}`,
                title: music.name,
                duration: 46000,
                artist: 'ABC',
                url: music.audio,
            });

            TrackPlayer.play();
        }
    };

    if (!isPlayerReady) {
        return (
            <SafeAreaView>
                <ActivityIndicator size='large' color='#bbb' />
            </SafeAreaView>
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePlayPress}>
            <View style={styles.itemContentContainer}>
                <FastImage source={music?.image ? { uri: music?.image } : Images.Babe} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>{music?.name}</Text>
                </View>
            </View>
            <View style={styles.iconPlay}>
                {!playing ? (
                    <SvgIcons.IcPlay width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
                ) : (
                    <SvgIcons.IcPause width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        itemContentContainer: {
            flexDirection: 'row',
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),
            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemContent: {
            flex: 1,
            marginLeft: scales(10),
        },
        itemContentHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        iconPlay: {
            position: 'absolute',
            left: scales(25),
            top: scales(25),
        },
    });
};
export default PlayAudio;
