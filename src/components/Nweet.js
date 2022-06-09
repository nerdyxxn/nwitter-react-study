import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  // DB에서 내가 선택한 트윗을 찾기 위한 ref
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  // 삭제하려는 이미지 파일 가리키는 ref
  const attachmentRef = ref(storageService, nweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      try {
        // 선택한 트윗 firestore에서 삭제
        await deleteDoc(NweetTextRef);
        // 선택한 트윗에 이미지 파일이 있는 경우 storage에서 이미지 파일 삭제
        if (nweetObj.attachmentUrl !== "") {
          await deleteObject(attachmentRef);
        }
      } catch (error) {
        window.alert("Delete Failed!");
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const quitEditing = () => {
    setEditing(false);
    setNewNweet(nweetObj.text);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div className="nweet">
      {/* editing이 true이면, 즉 수정중이면 수정폼 보여주고 아니라면 기존의 트윗 리스트 출력*/}
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="conatainer nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet!"
              autoFocus
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <button onClick={quitEditing} className="formBtn cancleBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="img" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
