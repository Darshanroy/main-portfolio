import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, Code, MessageSquare, Plus, Trash2, Save, 
  GraduationCap, Edit2, X, LogIn, LogOut, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageTransition from '@/components/PageTransition';

// Simple admin auth check - in production, use proper authentication
const ADMIN_PASSWORD = 'admin123'; // This should be replaced with proper auth

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    tagline: '',
    bio: '',
    photo_url: '',
    resume_url: '',
    location: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
  });

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Experiences state
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  // Skills state
  const [skills, setSkills] = useState<any[]>([]);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  // Messages state
  const [messages, setMessages] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profileRes, projectsRes, expRes, skillsRes, messagesRes] = await Promise.all([
        supabase.from('portfolio_profile').select('*').limit(1).maybeSingle(),
        supabase.from('projects').select('*').order('display_order'),
        supabase.from('experiences').select('*').order('start_date', { ascending: false }),
        supabase.from('skills').select('*').order('display_order'),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (expRes.data) setExperiences(expRes.data);
      if (skillsRes.data) setSkills(skillsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: 'Welcome to Admin Panel' });
    } else {
      toast({ title: 'Invalid password', variant: 'destructive' });
    }
  };

  // Profile handlers
  const saveProfile = async () => {
    try {
      const { error } = await supabase
        .from('portfolio_profile')
        .upsert(profile);
      
      if (error) throw error;
      toast({ title: 'Profile saved successfully' });
    } catch (error) {
      toast({ title: 'Error saving profile', variant: 'destructive' });
    }
  };

  // Project handlers
  const saveProject = async () => {
    if (!editingProject) return;
    
    try {
      if (editingProject.id) {
        const { error } = await supabase
          .from('projects')
          .update(editingProject)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { id, ...projectData } = editingProject;
        const { error } = await supabase
          .from('projects')
          .insert(projectData);
        if (error) throw error;
      }
      
      toast({ title: 'Project saved successfully' });
      setEditingProject(null);
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error saving project', variant: 'destructive' });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Project deleted' });
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error deleting project', variant: 'destructive' });
    }
  };

  // Experience handlers
  const saveExperience = async () => {
    if (!editingExperience) return;
    
    try {
      if (editingExperience.id) {
        const { error } = await supabase
          .from('experiences')
          .update(editingExperience)
          .eq('id', editingExperience.id);
        if (error) throw error;
      } else {
        const { id, ...expData } = editingExperience;
        const { error } = await supabase
          .from('experiences')
          .insert(expData);
        if (error) throw error;
      }
      
      toast({ title: 'Experience saved successfully' });
      setEditingExperience(null);
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error saving experience', variant: 'destructive' });
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Experience deleted' });
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error deleting experience', variant: 'destructive' });
    }
  };

  // Skill handlers
  const saveSkill = async () => {
    if (!editingSkill) return;
    
    try {
      if (editingSkill.id) {
        const { error } = await supabase
          .from('skills')
          .update(editingSkill)
          .eq('id', editingSkill.id);
        if (error) throw error;
      } else {
        const { id, ...skillData } = editingSkill;
        const { error } = await supabase
          .from('skills')
          .insert(skillData);
        if (error) throw error;
      }
      
      toast({ title: 'Skill saved successfully' });
      setEditingSkill(null);
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error saving skill', variant: 'destructive' });
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Skill deleted' });
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error deleting skill', variant: 'destructive' });
    }
  };

  // Message handlers
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Message deleted' });
      fetchAllData();
    } catch (error) {
      toast({ title: 'Error deleting message', variant: 'destructive' });
    }
  };

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <main className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button type="submit" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Default password: admin123
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              Admin <span className="text-gradient">Panel</span>
            </h1>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Messages</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input
                      value={profile.tagline}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Photo URL</Label>
                      <Input
                        value={profile.photo_url}
                        onChange={(e) => setProfile({ ...profile, photo_url: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Resume URL</Label>
                      <Input
                        value={profile.resume_url}
                        onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input
                        value={profile.github_url}
                        onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <Input
                        value={profile.linkedin_url}
                        onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter URL</Label>
                      <Input
                        value={profile.twitter_url}
                        onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={saveProfile} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Projects</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setEditingProject({
                      title: '',
                      description: '',
                      long_description: '',
                      thumbnail_url: '',
                      live_url: '',
                      github_url: '',
                      tech_stack: [],
                      featured: false,
                      display_order: projects.length,
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        {project.featured && (
                          <span className="text-xs text-primary font-medium">Featured</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingProject(project)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {projects.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No projects yet. Add your first project!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Project Edit Modal */}
              <AnimatePresence>
                {editingProject && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setEditingProject(null)}
                  >
                    <motion.div
                      className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6"
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold">
                          {editingProject.id ? 'Edit Project' : 'New Project'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setEditingProject(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Short Description</Label>
                          <Input
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Long Description</Label>
                          <Textarea
                            value={editingProject.long_description}
                            onChange={(e) => setEditingProject({ ...editingProject, long_description: e.target.value })}
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Thumbnail URL</Label>
                            <Input
                              value={editingProject.thumbnail_url}
                              onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Live URL</Label>
                            <Input
                              value={editingProject.live_url}
                              onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>GitHub URL</Label>
                            <Input
                              value={editingProject.github_url}
                              onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tech Stack (comma separated)</Label>
                            <Input
                              value={Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(', ') : ''}
                              onChange={(e) => setEditingProject({ 
                                ...editingProject, 
                                tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                              })}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={editingProject.featured}
                              onCheckedChange={(checked) => setEditingProject({ ...editingProject, featured: checked })}
                            />
                            <Label>Featured</Label>
                          </div>
                          <div className="flex-1">
                            <Label>Display Order</Label>
                            <Input
                              type="number"
                              value={editingProject.display_order}
                              onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) || 0 })}
                              className="w-24"
                            />
                          </div>
                        </div>

                        <Button onClick={saveProject} className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Save Project
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Experience & Education</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setEditingExperience({
                      title: '',
                      company: '',
                      location: '',
                      start_date: '',
                      end_date: '',
                      is_current: false,
                      description: '',
                      type: 'work',
                      display_order: experiences.length,
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {exp.type === 'education' ? (
                            <GraduationCap className="w-4 h-4 text-primary" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-primary" />
                          )}
                          <h3 className="font-semibold">{exp.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} {exp.company && exp.location && '•'} {exp.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingExperience(exp)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {experiences.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No experience entries yet. Add your first one!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Experience Edit Modal */}
              <AnimatePresence>
                {editingExperience && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setEditingExperience(null)}
                  >
                    <motion.div
                      className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6"
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold">
                          {editingExperience.id ? 'Edit Entry' : 'New Entry'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setEditingExperience(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Label>Type:</Label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="type"
                                checked={editingExperience.type === 'work'}
                                onChange={() => setEditingExperience({ ...editingExperience, type: 'work' })}
                                className="accent-primary"
                              />
                              Work
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="type"
                                checked={editingExperience.type === 'education'}
                                onChange={() => setEditingExperience({ ...editingExperience, type: 'education' })}
                                className="accent-primary"
                              />
                              Education
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Title / Position</Label>
                          <Input
                            value={editingExperience.title}
                            onChange={(e) => setEditingExperience({ ...editingExperience, title: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company / Institution</Label>
                            <Input
                              value={editingExperience.company}
                              onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                              value={editingExperience.location}
                              onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={editingExperience.start_date}
                              onChange={(e) => setEditingExperience({ ...editingExperience, start_date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={editingExperience.end_date}
                              onChange={(e) => setEditingExperience({ ...editingExperience, end_date: e.target.value })}
                              disabled={editingExperience.is_current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={editingExperience.is_current}
                            onCheckedChange={(checked) => setEditingExperience({ ...editingExperience, is_current: checked })}
                          />
                          <Label>Currently here</Label>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={editingExperience.description}
                            onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                            rows={4}
                          />
                        </div>

                        <Button onClick={saveExperience} className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Save Entry
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Skills</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setEditingSkill({
                      name: '',
                      icon: '',
                      category: '',
                      proficiency: 80,
                      display_order: skills.length,
                    })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingSkill(skill)}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteSkill(skill.id)}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {skills.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No skills yet. Add your first skill!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Skill Edit Modal */}
              <AnimatePresence>
                {editingSkill && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setEditingSkill(null)}
                  >
                    <motion.div
                      className="w-full max-w-md bg-card rounded-2xl border border-border p-6"
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold">
                          {editingSkill.id ? 'Edit Skill' : 'New Skill'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setEditingSkill(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Skill Name</Label>
                          <Input
                            value={editingSkill.name}
                            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Input
                            value={editingSkill.category}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                            placeholder="e.g., Frontend, Backend, Tools"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Proficiency ({editingSkill.proficiency}%)</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={editingSkill.proficiency}
                            onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) })}
                            className="w-full accent-primary"
                          />
                        </div>

                        <Button onClick={saveSkill} className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Save Skill
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages ({messages.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{msg.name}</h3>
                          <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMessage(msg.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{msg.message}</p>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No messages yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </PageTransition>
  );
};

export default Admin;
