import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, authService } from "fbase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();

  // 수정한 사용자 이름을 담을 state 생성
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  // 로그아웃
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };

  // 내 nweets 가져오는 function 생성
  const getMyNweets = async () => {
    // dbService의 “nweets” 컬렉션의 Doc들 중에서 userObj의 uid와 동일한 creatorId를 가진 모든 Doc를 내림차순으로 가져오는 쿼리 생성
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    // getDocs() 메소드로 쿼리 결과값 가져오기
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // Component Mount 됐을 때, 내 nweets 가져오는 function 호출하기
  useEffect(() => {
    getMyNweets();
  }, []);

  // 수정한 사용자 이름 받아오기
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  // 수정할 이름과 기존 이름이 다를 때에만 업데이트 수행하기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Update Display Name!"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
