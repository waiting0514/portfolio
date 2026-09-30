import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FlowDiagram from './FlowDiagram.vue'

const steps = ['Requirement', 'User Flow', 'Component Design']

describe('FlowDiagram', () => {
  it('renders the steps as an ordered list in order', () => {
    const wrapper = mount(FlowDiagram, { props: { steps, label: 'Workflow' } })

    const list = wrapper.get('ol')
    expect(list.attributes('aria-label')).toBe('Workflow')
    expect(wrapper.findAll('li').map((item) => item.find('span').text())).toEqual(steps)
  })

  it('places a decorative arrow between steps only', () => {
    const wrapper = mount(FlowDiagram, { props: { steps } })
    const arrows = wrapper.findAll('[aria-hidden="true"]')

    expect(arrows).toHaveLength(steps.length - 1)
    const items = wrapper.findAll('li')
    expect(items[items.length - 1]?.find('[aria-hidden="true"]').exists()).toBe(false)
  })

  it('stacks vertically on small screens and lays out horizontally from md', () => {
    const wrapper = mount(FlowDiagram, { props: { steps } })

    expect(wrapper.get('ol').classes()).toEqual(
      expect.arrayContaining(['flex-col', 'md:flex-row', 'md:flex-wrap']),
    )
  })
})
