import { Platform } from 'react-native';

export let db: any = null;

if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const SQLite = require('react-native-sqlite-storage');
    db = SQLite.openDatabase(
        { name: 'my.db', location: 'default' },
        () => console.log('Database opened successfully')
    );
} else {
    console.log('SQLite is not supported on this platform (Web)');
}
