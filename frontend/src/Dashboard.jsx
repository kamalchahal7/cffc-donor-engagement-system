import { useState, useEffect } from 'react'

function Dashboard() {
    const [subscriberCount, setSubscriberCount] = useState(0)
    const [sendHistory, setSendHistory] = useState([])
    const [sending, setSending] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [openCount, setOpenCount] = useState(0)

    // const [newEmail, setNewEmail] = useState('')

    useEffect(() => {
        fetch("https://cffc-donor-engagement-system.onrender.com/subs_count")
            .then(response => response.json())
            .then(data => setSubscriberCount(data.count))

        fetch("https://cffc-donor-engagement-system.onrender.com/send_history")
            .then(response => response.json())
            .then(data => setSendHistory(data.sends))
        fetch("https://cffc-donor-engagement-system.onrender.com/click_count")
            .then(response => response.json())
            .then(data => setClickCount(data.clicks))  
        fetch("https://cffc-donor-engagement-system.onrender.com/open_count")
            .then(response => response.json())
            .then(data => setOpenCount(data.opens))            
    }, [])

    const handleSend = (group) => {
        setSending(true)
        fetch(`https://cffc-donor-engagement-system.onrender.com/send_newsletter_group?group=${group}`, { method: "POST" })
            .then(response => response.json())
            .then(result => {
                alert(result.message)
                setTimeout(() => setSending(false), 5000)
                // Re-fetch updated data
                fetch("https://cffc-donor-engagement-system.onrender.com/send_history")
                    .then(response => response.json())
                    .then(historyData => setSendHistory(historyData.sends))
                fetch("https://cffc-donor-engagement-system.onrender.com/subs_count")
                    .then(response => response.json())
                    .then(countData => setSubscriberCount(countData.count))
            })
    }

    return (
        <div className='min-h-screen bg-gray-50 font-sans p-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>
                CFFC Email Dashboard
            </h1>

            {/* Historical Stats Row */}
            <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8'>
                <div className='bg-white shadow-md rounded-lg p-6 text-center'>
                    <p className='text-4xl font-bold'>{subscriberCount}</p>
                    <p className='text-gray-500'>Subscribers</p>
                </div>
                <div className='bg-white shadow-md rounded-lg p-6 text-center'>
                    <p className='text-4xl font-bold'>{sendHistory.length}</p>
                    <p className='text-gray-500'>Newsletters Sent</p>
                </div>
                <div className='bg-white shadow-md rounded-lg p-6 text-center'>
                    <p className='text-4xl font-bold'>{openCount}</p>
                    <p className='text-gray-500'>Total Emails Opened</p>
                </div>
                <div className='bg-white shadow-md rounded-lg p-6 text-center'>
                    <p className='text-4xl font-bold'>{clickCount}</p>
                    <p className='text-gray-500'>Total Site Visits</p>
                </div>
                <div className='bg-white shadow-md rounded-lg p-6 text-center'>
                    <p className='text-4xl font-bold'>
                        {sendHistory.length > 0
                            ? new Date(sendHistory[sendHistory.length - 1].created_at).toLocaleDateString()
                            : "N/A"}
                    </p>
                    <p className='text-gray-500'>Last Newsletter Sent</p>
                </div>
            </div>
            
            {/* Send Button */}
            <div className='text-center mb-8 flex flex-col md:flex-row justify-center gap-3'>
                <button 
                    onClick={() => handleSend("donors")}
                    disabled={sending}
                    className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200'>
                        {sending ? "Sending..." : "Send Newsletter to Donors"}
                </button>

                <button 
                    onClick={() => handleSend("teachers")}
                    disabled={sending}
                    className='bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200'>
                        {sending ? "Sending..." : "Send Newsletter to Teachers"}
                </button>

                <button 
                    onClick={() => handleSend("volunteers")}
                    disabled={sending}
                    className='bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200'>
                        {sending ? "Sending..." : "Send Newsletter to Volunteers"}
                </button>
            </div>
            <div className="text-center mb-8">
                <button 
                    onClick={() => handleSend("all")}
                    disabled={sending}
                    className='bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200'>
                        {sending ? "Sending..." : "Send Newsletter to All Subscribers"}
                </button>
            </div>


            {/* Add Email
            <div className='text-center mb-8 flex justify-center gap-2'>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Add subscriber email"
                    className='border rounded-lg px-4 py-2'
                />
                <button
                    onClick={() => {
                        fetch("https://cffc-donor-engagement-system.onrender.com/add_subscriber?email=" + newEmail, { method: "POST" })
                            .then(response => response.json())
                            .then(data => {
                                alert(data.message)
                                setNewEmail('')
                                fetch("https://cffc-donor-engagement-system.onrender.com/subs_count")
                                    .then(response => response.json())
                                    .then(countData => setSubscriberCount(countData.count))
                            })
                    }}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold'
                >
                    Add
                </button>
            </div> */}


            {/* Send History */}
            <div className='max-w-2xl mx-auto'>
                <h2 className='text-xl font-bold mb-4'>Send History</h2>
                {[...sendHistory].reverse().slice(0, showAll ? sendHistory.length : 5).map((send, index) => (
                    <div key={index} className='bg-white shadow-sm rounded-lg p-4 mb-2 flex justify-between'>
                        <p>{new Date(send.created_at).toLocaleString()}</p>
                        <p className=''>{send.num_sent} emails sent</p>
                    </div>
                ))}
                {sendHistory.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className='text-blue-600 hover: text-blue-800 underline mt-2 block mx-auto'>
                            {showAll ? "Show Less" : `Show All (${sendHistory.length})`}
                        </button>
                )}
            </div>
        </div>
    )
}

export default Dashboard