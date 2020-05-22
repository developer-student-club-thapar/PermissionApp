import Constants from 'expo-constants';
import { Platform } from 'react-native';

// sets the environment variables for urls used in frontend to be able to configure easily when run in development or in production
// Replace localhost conditional url for non ios platform with your ip address to run it locally!
const localhost =
  Platform.OS === 'ios' ? 'localhost:5000' : '192.168.43.33:5000';

const ENV = {
  dev: {
    apiUrl: localhost,
    amplitudeApiKey: null,
  },
  staging: {
    apiUrl: '[your.staging.api.here]',
    amplitudeApiKey: '[Enter your key here]',
    // Add other keys you want here
  },
  prod: {
    apiUrl: '[your.production.api.here]',
    amplitudeApiKey: '[Enter your key here]',
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
