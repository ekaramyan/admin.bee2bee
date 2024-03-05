import { fetchData } from '@/api/fetchData'

export const universalServerSideProps = async (
	url,
	token,
	dataKey = 'data'
) => {
	if (token) {
		try {
			const data = await fetchData(url, token)
			return {
				props: { [dataKey]: data },
			}
		} catch (error) {
			console.error('Error fetching data:', error)
			return {
				props: { [dataKey]: {} },
			}
		}
	}
	return {
		props: { [dataKey]: {} },
	}
}
