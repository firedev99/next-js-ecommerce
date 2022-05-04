import { ReactElement } from 'react'
import { useLottie } from '../../app/hooks/useLottie'
import animationData from '../../lotties/93795-dog-car-ride.json'

export default function DogLottie(): ReactElement {
    const { ref: dogRef } = useLottie(animationData)
    return <div ref={dogRef} />
}
