import React, { Children, Component, ReactNode } from 'react'

//components
import { SafeAreaView, View } from 'react-native'

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = props => {
  const { children } = props
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 20 }}>{children}</View>
    </SafeAreaView>
  )
}

export default AuthLayout
