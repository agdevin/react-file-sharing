import fetch from "isomorphic-unfetch";

const apiUrl = 'http://192.168.0.215:5000';

export const uploadFile = (formData) =>
  fetch(`${apiUrl}/cloud/files`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Failed.')
      let error = new Error(res.statusText)
      error.res = res
      return Promise.reject(error)
    }
  });

export const getMemberFiles = (memberId) =>
  fetch(`${apiUrl}/cloud/files?memberId=${memberId}`).then((res) => {
    if (res.ok) {
        return res.json();
    }
    return undefined;
  });

export const shareFile = (fileId, memberId, sharingMemberEmail) =>
  fetch(`${apiUrl}/cloud/files/share`, {
    method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileId: fileId,
        memberId: memberId,
        sharingMemberEmail: sharingMemberEmail
      }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Failed.')
      let error = new Error(res.statusText)
      error.res = res
      return Promise.reject(error)
    }
  });

export const getSharedFiles = (memberId) =>
  fetch(`${apiUrl}/cloud/files/share?memberId=${memberId}`).then((res) => {
    if (res.ok) {
        return res.json();
    }
    return undefined;
  });

export const getFileDetails = (memberId, fileId) =>
  fetch(`${apiUrl}/cloud/files?memberId=${memberId}&fileId=${fileId}`).then((res) => {
    if (res.ok) {
        return res.json();
    }
    return undefined;
  });

export const getSharedFileDetails = (memberId, sharedKey) =>
  fetch(`${apiUrl}/cloud/files/share?memberId=${memberId}&sharedKey=${sharedKey}`).then((res) => {
    if (res.ok) {
        return res.json();
    }
    return undefined;
  }); 