import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
