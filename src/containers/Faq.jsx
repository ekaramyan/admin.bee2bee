import React, { useState } from 'react'
import Wrapper from '@/components/UI/Wrapper'
import {
	Box,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	useMediaQuery,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Faq = () => {
	const [expanded, setExpanded] = useState(false)
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const faqData = [
		{
			question: 'Question 1',
			answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices mauris faucibus enim imperdiet euismod. Etiam vitae mauris turpis. Nunc pellentesque gravida porta. Nulla tincidunt eu erat pellentesque hendrerit. Praesent condimentum diam sed est aliquam, sagittis dictum nisl efficitur. Cras eleifend placerat magna, in ornare tellus maximus eget. Vivamus ultrices, ante ut cursus rhoncus, metus est hendrerit lectus, feugiat placerat dui tortor vitae est. Pellentesque tortor purus, volutpat et massa vel, eleifend dignissim mi. Aliquam in rhoncus ipsum, in lobortis nibh. In dignissim ligula quis felis fermentum volutpat. Aliquam erat volutpat. Nam hendrerit purus neque, vel aliquam nibh luctus tempor. Aliquam porttitor magna id ante dignissim auctor a at turpis.`,
		},
		{
			question: 'Question 2',
			answer: 'Answer on question 2',
		},
		{
			question: 'Question 3',
			answer: 'Answer on question 3',
		},
		{
			question: 'Question 4',
			answer: 'Answer on question 4',
		},
		{
			question: 'Question 5',
			answer: 'Answer on question 5',
		},
		{
			question: 'Question 6',
			answer: 'Answer on question 6',
		},
	]

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
				overflow: 'auto',
			}}
		>
			<Wrapper
				header={'FAQ'}
				notLoggedIn={false}
				style={{ minHeight: 700, maxHeight: '75dvh', overflow: 'auto' }}
			>
				<Grid container spacing={2} justifyContent='center' alignItems='start'>
					{faqData.map((item, index) => (
						<Grid item xs={12} md={6} key={index}>
							<Accordion
								expanded={expanded === `panel${index}`}
								onChange={handleChange(`panel${index}`)}
								elevation={0}
								square
								sx={{
									backgroundColor: 'transparent',
									'&:before': { display: 'none' },
									mb: 2,
								}}
							>
								<AccordionSummary
									sx={{
										borderRadius: 3,
										backgroundColor:
											expanded === `panel${index}` ? '#A5560F' : '#E06B00',
										color: 'common.white',
										':hover': {
											backgroundColor: '#A5560F',
										},
									}}
									expandIcon={<ExpandMoreIcon sx={{ color: 'common.white' }} />}
								>
									<Typography variant='real_cells_queue'>
										{item.question}
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										border: 'solid',
										borderColor: '#A5560F',
										borderWidth: '4px',
										borderRadius: 3,
										backgroundColor: '#E06B00',
										transform: 'translateY(5px)',
										p: 2,
									}}
								>
									<Typography variant='cell_user_subtext'>
										{item.answer}
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Grid>
					))}
				</Grid>
			</Wrapper>
		</Box>
	)
}

export default Faq
