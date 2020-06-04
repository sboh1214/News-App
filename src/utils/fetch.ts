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
