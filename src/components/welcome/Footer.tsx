import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"

export const Footer = observer(() => {
  const githubSVG = <svg
    className="w-3 h-3"
    width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>

  return (
    <div className="grid fixed bottom-0 left-0 grid-flow-col gap-4 justify-start items-start px-4 py-2 w-full text-xs text-gray-500 bg-gray-900 border-t border-gray-800">
      <div>© 2022 Simon Jäger</div>
      <a
        href="https://github.com/simon-jaeger/GhostLight"
        target="_blank"
        className="flex gap-1 items-center hover:text-gray-400"
      >
        {githubSVG} Repository
      </a>
      <details className="overflow-y-auto max-h-96 cursor-pointer">
        <summary>Privacy policy</summary>
        <p>Simon Jäger<br/>Kirchweg 15<br/>8247
          Flurlingen<br/>Switzerland<br/><strong>Email</strong>:
          simon.pascal.jaeger+ghostlight@gmail.com<br/><br/><strong>General</strong><br/>Based
          on Article 13 of the Swiss Federal Constitution and the data
          protection provisions of the Swiss Confederation (Data Protection Act,
          DSG), every person has the right to protection of their privacy as
          well as protection against misuse of their personal data. The
          operators of these pages take the protection of your personal data
          very seriously. We treat your personal data confidentially and in
          accordance with the legal data protection regulations as well as this
          privacy policy.<br/><br/>In cooperation with our hosting providers, we
          make every effort to protect the databases as well as possible against
          unauthorized access, loss, misuse or falsification.<br/><br/>We would
          like to point out that data transmission on the Internet (e.g.
          communication by e-mail) can have security gaps. A complete protection
          of data against access by third parties is not possible.<br/><br/>By
          using this website, you consent to the collection, processing and use
          of data in accordance with the following description. This website can
          generally be visited without registration. Data such as pages accessed
          or names of files accessed, date and time are stored on the server for
          statistical purposes without this data being directly related to your
          person. Personal data, in particular name, address or e-mail address
          are collected as far as possible on a voluntary basis. Without your
          consent, the data will not be passed on to third
          parties.<br/><br/><strong>With SSL/TLS encryption</strong><br/>This
          website uses SSL/TLS encryption for security reasons and to protect
          the transmission of confidential content, such as requests that you
          send to us as the site operator. You can recognize an encrypted
          connection by the fact that the address line of the browser changes
          from ""http://"" to ""https://"" and by the lock symbol in your
          browser line.<br/><br/>If SSL or TLS encryption is activated, the data
          you transmit to us cannot be read by third parties.<br/><br/><strong>Server
            Log-Files</strong><br/>The provider of this website automatically
          collects and stores information in so-called server log files, which
          your browser automatically transmits to us. These are:<br/>Browser
          type and Browser version<br/>Operating system used<br/>referrer
          URL<br/>Host name of the accessing computer<br/>Time of the server
          request<br/><br/>This data cannot be assigned to specific persons.
          This data is not merged with other data sources. We reserve the right
          to check this data retrospectively if we become aware of specific
          indications of illegal use.<br/><br/><strong>Copyrights</strong><br/>The
          copyright and all other rights to the content, images, photos or other
          files on the website belong exclusively to the operator of this
          website or the specifically named copyright holders. For the
          reproduction of all files, the written consent of the copyright holder
          must be obtained in advance.<br/>Anyone who commits a copyright
          infringement without the consent of the respective copyright holder
          may be liable to prosecution and possibly to
          damages.<br/><br/><strong>Disclaimer</strong><br/>The author assumes
          no liability for the correctness, accuracy, timeliness, reliability
          and completeness of the information.<br/>Liability claims against the
          author for material or immaterial damage resulting from access to, use
          or non-use of the published information, from misuse of the connection
          or from technical malfunctions are excluded.<br/><br/>All offers are
          non-binding. The author expressly reserves the right to change, add
          to, or delete parts of the pages or the entire offer without prior
          notice, or to temporarily or permanently cease
          publication. <strong>Source</strong>: <a
            href="https://brainbox.swiss/"
            target="_blank"
          >BrainBox Solutions</a><br/><br/>
          <strong>Matomo usage data</strong><br/> When you visit our site, we
          will store the following anonymized data: the website from which you
          visited us from, the parts of our site you visit, the date and
          duration of your visit, your anonymised IP address, information from
          the device (device type, operating system, screen resolution,
          language, country you are located in, and web browser type) you used
          during your visit, and more. We process this usage data in Matomo
          Analytics for statistical purposes, to improve our site and to
          recognize and stop any misuse.
        </p>
      </details>

      <details className="overflow-y-auto max-h-96 cursor-pointer">
        <summary>Credits</summary>
        Free assets by:<br/>
        <a
          href="https://rottingpixels.itch.io/"
          target="_blank"
        >Rottingpixels</a><br/>
        <a
          href="https://pixelfrog-assets.itch.io/"
          target="_blank"
        >Pixelfrog</a><br/>
        <a href="https://grafxkid.itch.io/" target="_blank">Grafxkid</a><br/>
        <a
          href="https://blackdragon1727.itch.io/"
          target="_blank"
        >Blackdragon1272</a><br/>
        <a href="https://kenney.nl" target="_blank">Kenney.nl</a><br/>
        <a
          href="https://mattwalkden.itch.io/"
          target="_blank"
        >MattWalkden</a><br/>
      </details>
    </div>
  )
})

Footer.displayName = nameof(Footer)
