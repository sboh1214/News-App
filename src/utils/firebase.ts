import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

enum FS {
  Users = 'users',
  Presses = 'presses',
  Strings = 'strings',
  SearchHistories = 'searchHistories',
  RssList = 'rssList',
  Categories = 'categories',
  Selectors = 'selectors',
}

export async function onUserAuthChanged(onChanged: any) {
  const subscriber = auth().onAuthStateChanged(onChanged);
  return subscriber;
}

export async function fetchUserSearchHistories() {
  const snapshot = await firestore()
    .collection(FS.Users)
    .doc(auth().currentUser?.uid)
    .collection(FS.SearchHistories)
    .orderBy('date', 'desc')
    .get();
  return snapshot.docs;
}

export async function addUserSearchHistories(query: string) {
  await firestore()
    .collection(FS.Users)
    .doc(auth().currentUser?.uid)
    .collection(FS.SearchHistories)
    .add({
      query,
      date: firestore.Timestamp.now(),
    });
}

export async function updateUserSearchHistories(id: string) {
  await firestore()
    .collection(FS.Users)
    .doc(auth().currentUser?.uid)
    .collection(FS.SearchHistories)
    .doc(id)
    .update({
      date: firestore.Timestamp.now(),
    });
}

export async function fetchUserRssList() {
  const query = await firestore()
    .collection(FS.Users)
    .doc(auth().currentUser?.uid)
    .collection(FS.RssList)
    .get();
  const category = await firestore()
    .collection(FS.Strings)
    .doc(FS.Categories)
    .get();
  return await Promise.all(
    query.docs.map(async (item) => {
      const press = await firestore()
        .collection(FS.Presses)
        .doc(item.data().pressId)
        .get();
      return {
        pressName: press.data()?.name,
        rssName: category.data()?.[item.data().rssId],
        pressId: item.data().pressId,
        rssId: item.data().rssId,
        rssUrl: item.data().rssUrl,
      };
    }),
  );
}

export async function deleteUserRss(id: string) {
  await firestore()
    .collection(FS.Users)
    .doc(auth().currentUser?.uid)
    .collection(FS.RssList)
    .doc(id)
    .delete();
}

export async function fetchAllRssList() {
  const list = [];
  const snapshot = await firestore().collection(FS.Presses).get();
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

export async function getSelector(host: string) {
  const selectors = await firestore()
    .collection(FS.Strings)
    .doc(FS.Selectors)
    .get();
  return (selectors.data() ?? [])[host];
}

export function sendAnalyticsSearch(query: string) {
  analytics().logEvent('search', {
    query,
  });
}
