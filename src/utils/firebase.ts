import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

export async function fetchUserSearchHistories() {
  const snapshot = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('searchHistories')
    .orderBy('date', 'desc')
    .get();
  return snapshot.docs;
}

export async function addUserSearchHistories(query: string) {
  await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('searchHistories')
    .add({
      query,
      date: firestore.Timestamp.now(),
    });
}

export async function updateUserSearchHistories(id: string) {
  await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('searchHistories')
    .doc(id)
    .update({
      date: firestore.Timestamp.now(),
    });
}

export async function fetchUserRssList() {
  const query = await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('rssList')
    .get();
  return query.docs;
}

export async function deleteUserRss(id: string) {
  await firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('rssList')
    .doc(id)
    .delete();
}

export async function fetchAllRssList() {
  const list = [];
  const snapshot = await firestore().collection('presses').get();
  if (snapshot) {
    snapshot.docs.forEach((press) => {
      Object.keys(press.data().rss).forEach((key) => {
        list.push({
          pressId: press.id,
          pressName: press.data().name,
          rssId: key,
          rssUrl: press.data().rss[key],
        });
      });
    });
  }
  return list;
}

export function sendAnalyticsSearch(query: string) {
  analytics().logEvent('search', {
    query,
  });
}
