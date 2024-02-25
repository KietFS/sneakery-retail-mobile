import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigators/screen';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateAndSimpleReset(
  name: keyof RootStackParamList,
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
}
