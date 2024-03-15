import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Footer.css";

function Footer() {
	const sessionUser = useSelector((state) => state.session.user);
	const [randomized, setRandomized] = useState([]);

	const team = [
		{
			name: "Andrew Madrigal",
			github: "https://github.com/Andrizle",
			linkedin: "https://www.linkedin.com/in/andrew-madrigal/",
		},
		{
			name: "Erich Nguyen",
			github: "https://github.com/aznguymp4",
			linkedin: "https://www.linkedin.com/in/erich-n/",
		},
		{
			name: "Ran Wang",
			github: "https://github.com/ranwang0410",
			linkedin: "https://www.linkedin.com/in/ran-wang-80b47a1b8/",
		},
		{
			name: "Wilmer Sampedro",
			github: "https://github.com/wilmersampedro",
			linkedin: "https://www.linkedin.com/in/wilmer-sampedro/",
		},
	];

	useEffect(() => {
		setRandomized(team.sort(() => 0.5 - Math.random()));
	}, []);

	return (
		<div id="footerBar" className={sessionUser ? "smallSize" : ""}>
			<div className="footerTeamDiv">
				<h3 className="footerTeamHeader">Development Team</h3>
				<div className="membersContainer">
					{randomized &&
						randomized.map((member, i) =>
							i !== team.length - 1 ? (
								<>
									<div>
										{member.name}{" "}
										<div className="footerLinksContainer">
											{member.github && (
												<a
													href={member.github}
													className="footerLink"
													target="_blank"
													rel="noreferrer"
												>
													<i className="fa-brands fa-github"></i>
												</a>
											)}{" "}
											{member.linkedin && (
												<a
													href={member.linkedin}
													className="footerLink"
													target="_blank"
													rel="noreferrer"
												>
													<i className="fa-brands fa-linkedin"></i>
												</a>
											)}
										</div>
									</div>{" "}
									<span className="footerSlashes">
										&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
									</span>
								</>
							) : (
								<>
									<div>
										{member.name}{" "}
										<div className="footerLinksContainer">
											{member.github && (
												<a href={member.github} className="footerLink">
													<i className="fa-brands fa-github"></i>
												</a>
											)}{" "}
											{member.linkedin && (
												<a href={member.linkedin} className="footerLink">
													<i className="fa-brands fa-linkedin"></i>
												</a>
											)}
										</div>
									</div>
								</>
							),
						)}
				</div>
			</div>
		</div>
	);
}

export default Footer;
