import { useEffect, useState } from "react";
import './Footer.css'

function Footer() {
    const fullSize = true;
    const [randomized, setRandomized] = useState([]);

    const team = [
        {
            name:'ANDREW MADRIGAL',
            github: 'https://github.com/Andrizle',
            linkedin: 'https://www.linkedin.com/in/andrew-madrigal/'
        },
        {
            name: 'ERICH NGUYEN',
            github: 'https://github.com/aznguymp4',
            linkedin: 'https://www.linkedin.com/in/erich-n/'
        },
        {
            name: 'RAN WANG',
            github: 'https://github.com/ranwang0410',
            linkedin: ''
        },
        {
            name:'WILMER SAMPEDRO',
            github:'https://github.com/wilmersampedro',
            linkedin: 'https://www.linkedin.com/in/wilmer-sampedro/'
        },
    ];

    useEffect(() => {
        setRandomized(team.sort(() => 0.5 - Math.random()))
    }, [])

    return <div id="footerBar" className={fullSize?'fullSize':''}>
        <div className='footerTeamDiv'>
            <p className='footerTeamHeader'>Development Team</p>
            <div className='membersContainer'>
              {randomized && randomized.map((member, i) =>
                i !== team.length - 1 ? (
                  <>
                    <div>
                      {member.name}{' '}
                      <div className='footerLinksContainer'>
                      {member.github &&
                        <a
                          href={member.gitHub}
                          className='footerLink'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <i className='fa-brands fa-github'></i>
                        </a>}{' '}
                        {member.linkedin &&
                        <a
                          href={member.linkedin}
                          className='footerLink'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <i className='fa-brands fa-linkedin'></i>
                        </a>}
                      </div>
                    </div>{' '}
                    <span className='footerSlashes'>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</span>
                  </>
                ) : (
                  <>
                    <div>
                      {member.name}{' '}
                      <div className='footerLinksContainer'>
                        {member.github &&
                        <a
                          href={member.gitHub}
                          className='footerLink'
                        >
                          <i className='fa-brands fa-github'></i>
                        </a>}{' '}
                        {member.linkedin &&
                        <a
                          href={member.linkedin}
                          className='footerLink'
                        >
                          <i className='fa-brands fa-linkedin'></i>
                        </a>}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
        </div>
    </div>
  }

  export default Footer;
