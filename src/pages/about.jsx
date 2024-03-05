import TextBlock from '@/containers/TextBlock'
import useAuthentication from '@/hooks/useAuthentication'

export default function AboutPage() {
	useAuthentication(false)
	return (
		<TextBlock
			header={'About us'}
			text={`
In many countries around the world, ancient folk traditions of mutual aid have endured through the ages.

Georgia is one such country where this tradition remains deeply ingrained in the daily lives of its people.

Given the global rise in unemployment and financial challenges, a compelling idea emerged: the creation of a voluntary gift-giving movement aimed at fostering financial prosperity for all participants through mutual support. 

This vision gave birth to the BEE2BEE project in Georgia, which officially commenced on January 12, 2023. 

The name BEE2BEE perfectly represents the main idea of this project.

Bees are remarkable insects known for their cohesive community spirit. They cannot thrive in isolation and are characterized by their unwavering work ethic, strict adherence to norms established in the family, and a strong sense of mutual assistance and equality.

In essence, BEE2BEE mirrors the spirit of a charitable organization, where each participant not only receives support in pursuing their dreams but also actively contributes to helping others achieve their goals. 

BEE2BEE operates as a decentralized international mutual aid system, fostering interactive communication and gift exchanges among its participants.

Authors of the project

Ms. Tea Samsonidze 

Ms. Nino Gvalia 

To ensure accessibility for all, a dedicated team of administrators tirelessly assists individuals in understanding the project's essence and resolving any technical issues that may arise during both the entry process and the entire duration of participation.


	`}
		/>
	)
}
