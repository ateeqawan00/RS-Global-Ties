import { GoBell, GoPaperclip } from "react-icons/go"
import { IoEllipsisVertical, IoSend } from "react-icons/io5"
import { IoMdMic, IoMdMicOff } from "react-icons/io"

import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { Comment } from "react-loader-spinner"

import axiosInstance from "../../services/axiosInstance"
import { ReactMic } from "react-mic"

import io from "socket.io-client"
// const socket = io("http://localhost:3000")
// http://localhost:3000
// https://backend.rsglobalties.com
const SuperChatLayout = () => {
  const user = useSelector((state) => state.user.user)
  const [chats, setChats] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState(null)
  const [fetchedMessages, setFetchedMessages] = useState()
  const [file, setFile] = useState()
  const [mediaType, setMediaType] = useState()
  const [fullScreenImage, setFullScreenImage] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [actionFeedback, setActionFeedback] = useState("")

  const [showDeleteIcon, setShowDeleteIcon] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const socketRef = useRef(null)
  const chatMessagesRef = useRef(null)

  const handleMenuToggle = () => {
    setShowMenu(!showMenu) // Toggle menu visibility
  }

  const toggleDeleteIcon = (messageId) => {
    setShowDeleteIcon(!showDeleteIcon)
    setSelectedMessageId(messageId)
  }

  useEffect(() => {
    socketRef.current = io("http://localhost:3000")

    socketRef.current.emit("register", user?._id)

    socketRef.current.on("new-message", (message) => {
      // console.log("new-message event")
      let content = message.content
      let media = message.media
      let senderId = message.sender
      setFetchedMessages((prevMessages) => [
        ...prevMessages,
        { content, media, sender: { _id: senderId } },
      ])
      scrollToBottom()
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [user])

  const deleteMessage = async (messageId) => {
    try {
      const res = await axiosInstance.delete(
        `/Message/deletemessages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (res.status === 200) {
        setFetchedMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        )
      }
    } catch (error) {
      console.log("delete message error", error)
    }
  }

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleClearChats = async (receiverId) => {
    try {
      const res = await axiosInstance.delete("/Message/deleteAllMessages", {
        data: { sender: user._id, receiver: receiverId },
      })
      if(res.status === 200) {
        setFetchedMessages(null)
      }
      
    } catch (error) {
      console.log("error clearing chats: ", error)
    }
  }

  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl)
  }

  const handleMessageSend = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      if (recordedAudio) {
        formData.append("media", recordedAudio.blob, "audio.webm")
        formData.append("mediaType", "audio")
      } else if (file) {
        formData.append("media", file)
        formData.append("mediaType", mediaType || "")
      }
      formData.append("content", message)
      formData.append("receiver", selectedChat?.users[0]?._id || "")

      const response = await axiosInstance.post(
        "/Message/sendMessage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(response)
      setIsLoading(false)
      // console.log("sent message response: ", response)
      const senderId = response.data?.message?.sender._id
      const content = response.data?.message?.content
      const mimeType = response.data?.message?.media
      const id = response.data.message?._id
      setFetchedMessages((prevMessages) => [
        ...prevMessages,
        {
          content,
          media: mimeType,
          sender: { _id: senderId },
          _id: id,
        },
      ])
      setMessage("")
      setRecordedAudio(null)
      setIsRecording(false)
      scrollToBottom()
      if (file) {
        document.getElementById("media").value = null
        setFile(null)
      }
    } catch (error) {
      setIsLoading(false)
      console.log("send message error", error)
    }
  }

  const handleSelectFile = (e) => {
    let file = e.target.files[0]
    console.log("file: ", file)
    let [type] = file?.type?.split("/") || ""
    // let type = file.type || "file"
    setFile(file)
    setMediaType(type)
    setActionFeedback(`Selected file: ${file.name}`)
  }

  const handleAudioRecordStart = () => {
    // console.log("started")
    setIsRecording(true)
    setActionFeedback("Recording audio...")
  }

  const handleAudioRecordStop = (blobObject) => {
    // console.log("stopped")
    setRecordedAudio(blobObject)
    setIsRecording(false)
    // console.log("blob: ", blobObject)

    setActionFeedback(`Audio recording stopped. Recorded file is selected.`)
  }
  // console.log("recorded audio: ", recordedAudio)

  const calculateTimeDifference = (createdAt) => {
    const messageTime = new Date(createdAt)
    const currentTime = new Date()
    const difference = Math.floor((currentTime - messageTime) / 1000) // Difference in seconds

    if (difference < 60) {
      return `${difference}s`
    } else if (difference < 3600) {
      return `${Math.floor(difference / 60)}m`
    } else if (difference < 86400) {
      return `${Math.floor(difference / 3600)}h`
    } else {
      return `${Math.floor(difference / 86400)}d`
    }
  }

  // fetching chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get("/chat/getChat", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        setChats(response.data)
        setSelectedChat(response.data[0])
        // console.log(response);
      } catch (error) {
        console.log("chat error: ", error)
      }
    }

    fetchChats()
  }, [])

  // fetching specific chats
  useEffect(() => {
    const fetchMessagesOfChat = async () => {
      try {
        let chatId = selectedChat ? selectedChat._id : ""

        const response = await axiosInstance.get(
          `/Message/getMessagesOfPerticularChat/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setFetchedMessages(response.data)
        // console.log("previous messages: ", response)
      } catch (error) {
        console.log("message error: ", error)
      }
    }
    if (selectedChat) {
      fetchMessagesOfChat()
    }
  }, [selectedChat])

  // console.log("selected chat: ", selectedChat)
  // console.log(fetchedMessages)
  // console.log("chats: ", chats)

  useEffect(() => {
    scrollToBottom()
  }, [fetchedMessages])

  return (
    <div>
      <h1 className='text-2xl font-[500]'>Inbox</h1>
      <div className='drawer lg:drawer-open'>
        <input id='chatDrawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* Design The Chat Page content here */}
          {selectedChat && (
            <div className='flex flex-col'>
              <h1 className='bg-primary text-white p-4 rounded-lg font-semibold flex-1 justify-between flex'>
                <div>{selectedChat.users[0].fullName}</div>
                <div className='cursor-pointer' onClick={handleMenuToggle}>
                  <IoEllipsisVertical />
                </div>
                {showMenu && (
                  <div className='absolute top-10 right-5 bg-white border border-gray-300 rounded-lg p-2 z-10 text-black'>
                    <button
                      onClick={() =>
                        handleClearChats(selectedChat.users[0]._id)
                      }
                      className='block w-full text-left hover:bg-gray-100 p-2 rounded-md'
                    >
                      Clear Chats
                    </button>
                    {/* Other menu options */}
                  </div>
                )}
              </h1>
              {/* Display chat messages here */}
              <div
                className='chat-messages h-[75vh] overflow-y-auto flex flex-col'
                ref={chatMessagesRef}
              >
                {fetchedMessages &&
                  fetchedMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${
                        message.sender._id === selectedChat.users[0]._id
                          ? "self-start"
                          : "self-end"
                      } ${
                        message.sender._id === selectedChat.users[0]._id
                          ? "bg-gray-100 border border-gray-300"
                          : "bg-blue-500 text-white"
                      } rounded-md p-2 mb-2 flex`}
                    >
                      <div className='flex'>
                        {/* Delete icon */}
                        {showDeleteIcon &&
                          selectedMessageId === message._id && (
                            <div
                              className='cursor-pointer'
                              onClick={() => deleteMessage(message._id)}
                            >
                              <span>&times;</span>
                            </div>
                          )}
                        {/* Three dots icon for options */}
                        {message.content &&
                          message.sender._id !== selectedChat.users[0]._id && (
                            <div
                              className='flex items-center justify-center w-8 h-8 cursor-pointer text-white hover:text-gray-700'
                              onClick={() => toggleDeleteIcon(message._id)}
                            >
                              <IoEllipsisVertical />
                            </div>
                          )}
                      </div>

                      <div>
                        {message.media && message.media.type !== "none" && (
                          <div className='relative'>
                            {message.media.type === "image" && (
                              <img
                                src={message.media.url}
                                className='max-w-52'
                                alt='Attached Image'
                                onClick={() =>
                                  handleImageClick(message.media.url)
                                }
                              />
                            )}
                            {message.media.type === "video" && (
                              <video
                                className='w-full h-auto'
                                controls
                                style={{ maxWidth: "200px" }}
                              >
                                <source
                                  src={message.media.url}
                                  type='video/mp4'
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            {message.media &&
                              message.media.type === "audio" && (
                                <audio controls>
                                  <source
                                    src={message.media.url}
                                    type='audio/mpeg'
                                  />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              )}
                            {message.media &&
                              message.media.type === "application" && (
                                <div className='relative'>
                                  {/* Display PDF using iframe */}
                                  <p className='text-sm mb-2'>
                                    PDF file attached:
                                  </p>
                                  {/* <iframe
                                    src={message.media.url}
                                    title='Attached PDF'
                                    className='w-full h-[100px]'
                                  /> */}
                                  {/* Download button for the PDF */}
                                  <a
                                    href={message.media.url} // URL of the PDF
                                    download='document.pdf' // Default filename for download
                                    className='bg-blue-500 text-white mt-2 inline-block rounded-md'
                                  >
                                    Download PDF
                                  </a>
                                </div>
                              )}
                          </div>
                        )}
                        {message.content && message.content === "null"
                          ? ""
                          : message.content}
                      </div>
                    </div>
                  ))}

                {/* open image in full screen */}
                {fullScreenImage && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-lg z-50'>
                    <img
                      src={fullScreenImage}
                      alt='Full Screen Image'
                      className='max-w-screen-lg max-h-screen mx-auto'
                      onClick={() => setFullScreenImage(null)}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center">
              {isLoading && (
                <div className=''>
                  <Comment
                    visible={true}
                    height='40'
                    width='40'
                    ariaLabel='comment-loading'
                    wrapperStyle={{}}
                    wrapperClass='comment-wrapper'
                    color='#fff'
                    backgroundColor='#4a90e2'
                  />
                </div>
              )}
              </div>
              {actionFeedback && (
                <div className='bg-blue-500 text-white p-2 mb-2 rounded-md'>
                  {actionFeedback}
                </div>
              )}
              <div className='flex flex-1 gap-1'>
                <label
                  htmlFor='media'
                  className='flex items-center gap-2 cursor-pointer border border-gray-500 p-3 rounded-lg bg-gray-100'
                >
                  <GoPaperclip />
                  <input
                    id='media'
                    type='file'
                    className='hidden'
                    onChange={handleSelectFile}
                  />
                </label>
                <ReactMic
                  record={isRecording}
                  className='w-0 h-0'
                  onStop={handleAudioRecordStop}
                  mimeType='audio/webm'
                />
                <button
                  onClick={
                    isRecording ? handleAudioRecordStop : handleAudioRecordStart
                  }
                  className={`border border-gray-500 p-3 rounded-full ${
                    isRecording ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                >
                  {isRecording ? <IoMdMicOff /> : <IoMdMic />}
                </button>
                <input
                  type='text'
                  value={message || ""}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMessageSend()
                    }
                  }}
                  placeholder='Type your message...'
                  className='w-full border border-gray-500 rounded-lg px-3 py-1'
                />
                <button
                  onClick={handleMessageSend}
                  className='bg-blue-500 p-3 rounded-full text-white'
                >
                  <IoSend />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='drawer-side scrollbar-hide'>
          <ul className='menu p-2 w-80 min-h-full bg-white text-base-content rounded-md'>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-bold p-2'>Messages</h1>
              {/* <GoBell size={20} /> */}
            </div>
            {/* <div
              className='relative mb-3 bg-white rounded-md'
              data-te-input-wrapper-init
            >
              <input
                type='search'
                className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear'
                id='exampleSearch2'
                placeholder='Search Chats'
              />
            </div> */}
            {chats &&
              chats.map((chat, index) => (
                <li key={index} onClick={() => setSelectedChat(chat)}>
                  <div className='flex flex-col items-center w-full'>
                    <div className='flex items-center justify-between w-full'>
                      <h1 className='font-semibold text-lg'>
                        {chat.users[0]?.fullName}
                      </h1>
                      <p>
                        {calculateTimeDifference(chat.latestMessage?.createdAt)}
                      </p>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <p>{chat.latestMessage?.content}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SuperChatLayout
