import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
    getFirestore, getDocs, doc, getDoc,
    collection, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsB7EgfO6SDcQQdy1y9vihnjOXsd1LRNY",
    authDomain: "olx-smit8.firebaseapp.com",
    projectId: "olx-smit8",
    storageBucket: "olx-smit8.appspot.com",
    messagingSenderId: "201892631281",
    appId: "1:201892631281:web:17ad67ef72cf33ec0b8f50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();



async function postAdToDb(ad) {
    /*
    1. Upload image to Storage
    2. Get the URL of the image
    3. Add all data with URL in database
    */


    try {
        const storageRef = ref(storage, `ads/${ad.image.name}`);

        await uploadBytes(storageRef, ad.image)

        const url = await getDownloadURL(storageRef)

        ad.image = url

        await addDoc(collection(db, "ads"), ad)
        alert('Data added successfully!')
    } catch (e) {
        alert(e.message)
    }
}

async function getAds() {
    const querySnapshot = await getDocs(collection(db, "ads"))
    const ads = []
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // const ad = { id: doc.id, ...doc.data() }

        const ad = doc.data()
        ad.id = doc.id

        ads.push(ad)
    });

    return ads
}

async function getSingleAd(adId) {
    const docRef = doc(db, "ads", adId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const ad = docSnap.data()

        return ad
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

export {
    postAdToDb,
    getAds,
    getSingleAd
}