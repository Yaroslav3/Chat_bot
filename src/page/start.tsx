import React, {} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {LeftComponent} from '../components/page_component/left.component.tsx';
import {RightComponent} from '../components/page_component/right.component.tsx';
import {CoreModelsInterface} from '../interface/core-models-interface.tsx';
import {RootState} from '../store/store.tsx';
import {useScreenLayout} from '../service/helper.service.tsx';


export const StartScreen: React.FC = () => {
  const { isShowRight, widthLeft } = useScreenLayout();
  const selectChat: CoreModelsInterface.Chat | null = useSelector((state: RootState) => state.dataChats.selectChat);

  // desktop version
  if (isShowRight) {
    return (
      <View style={styles.container}>
        <View
          style={[styles.container_left, {width: isShowRight ? widthLeft : '100%'}]}>
          <LeftComponent />
        </View>
        <View style={styles.container_right}>
          <RightComponent />
        </View>
      </View>
    );
  }

  // mob version
  return (
    <View style={styles.container}>
      {!selectChat ? (
        <View style={[styles.container_left, {width: isShowRight ? widthLeft : '100%'}]}>
          <LeftComponent />
        </View>
      ) : (
        <View style={styles.container_right}>
          <RightComponent />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  container_left: {
    flexShrink: 0,
  },
  container_right: {
    flex: 1,
  },
});
