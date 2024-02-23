import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glabs.cdplus',
  appName: 'cd-sharp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
