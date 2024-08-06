// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';

class SocialMediaService extends HttpService {
  private readonly prefix: string = 'api/social-media';

  httpGetPosts = ({
    searchText = '',
    page = 0,
    limit = 9,
  }: {
    searchText?: string;
    page?: number;
    limit?: number;
  }): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getPosts?searchText=${searchText}&page=${page}&limit=${limit}`
    );

  httpGetPost = ({
    id,
    page = 0,
    limit = 9,
  }: {
    id: string;
    page?: number;
    limit?: number;
  }): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getPost/${id}?page=${page}&limit=${limit}`
    );

  httpGetPostComments = ({
    id,
    page = 0,
    limit = 9,
  }: {
    id: string;
    page?: number;
    limit?: number;
  }): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getPostComments/${id}?page=${page}&limit=${limit}`
    );

  httpGetPostReports = ({
    searchText,
    locationText,
    page = 0,
    limit = 9,
  }: {
    searchText: string;
    locationText: string;
    page?: number;
    limit?: number;
  }): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/httpGetPostReports?searchText=${searchText}&locationText=${locationText}&page=${page}&limit=${limit}`
    );

  httpCreatePost = (data: any): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/createPost`, data);

  httpAddPostReaction = (id: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/addPostReaction/${id}`);

  httpAddPostReport = (email: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/addInvitedClient/${email}`);

  httpDeletePost = (id: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/deletePost/${id}`);

  httpAddPostComment = ({ id, content }: { id: string, content: string }): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/addPostComment/${id}`, { content });

  httpUpdatePostComment = ({ id, content }: { id: string, content: string }): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/updatePostComment/${id}`, { content });

  httpDeletePostComment = (id: string): Promise<IResponseInterface> =>
    this.delete(`${this.prefix}/deletePostComment/${id}`);


}
export const socialMediaService = new SocialMediaService();
