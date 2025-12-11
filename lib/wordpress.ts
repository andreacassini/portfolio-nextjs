import axios from 'axios';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8080/wp-json/wp/v2';

export interface Project {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  meta: {
    github_url?: string;
    demo_url?: string;
    technologies?: string;
    status?: 'completed' | 'in-progress' | 'coming-soon';
  };
  menu_order: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await axios.get(`${WP_API_URL}/project`, {
      params: {
        _embed: true,
        orderby: 'menu_order',
        order: 'asc',
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Get single project
export async function getProject(id: number): Promise<Project | null> {
  try {
    const response = await axios.get(`${WP_API_URL}/project/${id}`, {
      params: {
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Get page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await axios.get(`${WP_API_URL}/pages`, {
      params: {
        slug,
      },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Send contact form (via WordPress REST API or custom endpoint)
export async function sendContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // You'll need to create a custom WordPress endpoint for this
    // For now, return mock response
    console.log('Contact form data:', data);
    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    };
  }
}
