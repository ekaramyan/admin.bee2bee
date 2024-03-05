function useIsLeader() {
	const check = (leaderId, userId) => {
		return leaderId === userId ? 'leader' : 'follower'
	}

	return check
}

export default useIsLeader
