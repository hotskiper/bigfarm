import { Button, Color, Margin, Text, Select } from '@bigfarm/react'
import '@bigfarm/scss/lib/Button.css'
import '@bigfarm/scss/lib/Utilities.css'
import '@bigfarm/scss/lib/Margin.css'
import '@bigfarm/scss/lib/Select.css'

interface RecommendedProps {
  onClick?: () => void
  // Add other properties if needed
}

function App() {
  const options = [
    { label: 'black', value: 'black' },
    { label: 'green', value: 'green' },
    { label: 'pink', value: 'pink' },
  ]
  return (
    <div style={{ padding: '20px' }}>
      <Button label="hello"></Button>
      <Margin left>
        <Color hexCode="#000" width="sm" height="sm" />
      </Margin>
      <Text>123</Text>
      <Select
        options={options}
        renderOption={({ option, getOptionRecommendedProps }) => {
          const customOnClick = () => {
            console.log('add custom logic here')
            const recommendedProps: RecommendedProps =
              getOptionRecommendedProps()
            if (recommendedProps.onClick) {
              recommendedProps.onClick()
            }
          }
          return (
            <p
              {...getOptionRecommendedProps({
                // className: 'custom',
                onClick: () => {
                  customOnClick()
                },
              })}
            >
              {option.label}
            </p>
          )
        }}
      />
    </div>
  )
}

export default App
