import { Heading, Progress, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <>
    <VStack gap={4} h={'100vh'}  alignItems={'center'} justifyContent={'center'}   w={'100%'}>
  <Heading>🔥🧊</Heading>
  <Progress w={'30%'} size='xs' isIndeterminate={true} />
</VStack>
    </>
  )
}

export default Loader