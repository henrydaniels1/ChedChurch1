import type { AboutUsContent } from "./types"

export const aboutUsContent: AboutUsContent = {
  mission:
    "To glorify God by making disciples of Jesus Christ who love God, love others, and serve the world through the power of the Holy Spirit.",
  vision:
    "A thriving community where every person experiences the transforming love of Jesus Christ and discovers their God-given purpose.",
  history: {
    title: "Our Story",
    content:
      "Grace Community Church was founded in 1985 by a small group of families who felt called to create a welcoming space for worship and community service. Over the decades, we have grown from a handful of members meeting in a school gymnasium to a vibrant congregation of over 500 families.",
    timeline: [
      {
        year: "1985",
        event: "Church founded with 25 founding members",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
                 ],
      },
      {
        year: "1990",
        event: "First permanent building constructed",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
        ],
      },
      {
        year: "1998",
        event: "Youth center and fellowship hall added",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
        ],
      },
      {
        year: "2005",
        event: "Community outreach programs launched",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
        ],
      },
      {
        year: "2015",
        event: "Sanctuary renovation and expansion completed",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
        ],
      },
      {
        year: "2020",
        event: "Online ministry and livestreaming began",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
        ],
      },
    ],
  },
  leadership: [
    {
      id: "pastor-john",
      name: "Pastor Adeboye",
      position: "Senior Pastor",
      bio: "Pastor John has been leading Grace Community Church since 2010. He holds a Master of Divinity from Seminary and is passionate about expository preaching and pastoral care.",
      image: "https://i.pinimg.com/736x/49/fd/54/49fd5409a92dbcf9189279b856fe5b12.jpg",
    },
    {
      id: "pastor-sarah",
      name: "Pastor Sam Adeyemi",
      position: "Associate Pastor",
      bio: "Pastor Sarah oversees our youth and family ministries. She brings energy and creativity to help families grow in faith together.",
      image: "https://i.pinimg.com/736x/8b/ad/a6/8bada60dc11fbb24db88d2c2ea49791c.jpg",
    },
    {
      id: "minister-david",
      name: "Bishop T.D James",
      position: "Worship Minister",
      bio: "David leads our worship team and coordinates all musical aspects of our services. He has been serving in worship ministry for over 15 years.",
      image: "https://i.pinimg.com/736x/38/39/65/3839657b36fbf81b16d774a3e9659db8.jpg",
    },
    {
      id: "director-maria",
      name: "Apostle Joshua selman",
      position: "Children's Director",
      bio: "Maria coordinates all children's programs and ensures our youngest members have engaging, age-appropriate learning experiences.",
      image: "https://i.pinimg.com/736x/4c/a9/83/4ca983b0ddda3870aa134f0aea8c8feb.jpg",
    },
  ],
  values: [
    {
      title: "Faith",
      description: "We believe in the transforming power of faith in Jesus Christ and the authority of Scripture.",
      icon: "cross",
    },
    {
      title: "Community",
      description: "We are committed to building authentic relationships and supporting one another in love.",
      icon: "heart",
    },
    {
      title: "Service",
      description:
        "We actively serve our local community and support global missions with our time, talents, and resources.",
      icon: "hands",
    },
    {
      title: "Growth",
      description: "We encourage spiritual growth through worship, study, prayer, and discipleship.",
      icon: "tree",
    },
  ],
}
