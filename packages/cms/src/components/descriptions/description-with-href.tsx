'use client'

import './descriptions.scss'

export type DescriptionWithHrefProps = {
  /** Text appearing before the displayed href. */
  displayedText: string
  /** The Displayed href "/news" on the description with highlight */
  displayedHref: string
  /**
   * When the user clicks the href, where does he get taken to?
   * Usually this should be the real link on the website.
   *
   * By default, it will go to the same link as `displayedHRef`
   */
  href?: string
}
const DescriptionWithHref = ({ displayedText, displayedHref, href }: DescriptionWithHrefProps) => {
  return (
    <span>
      {displayedText}{' '}
      <a className="description-text" href={href ?? displayedHref} target="_blank">
        {displayedHref}
      </a>
      .
    </span>
  )
}
export default DescriptionWithHref
