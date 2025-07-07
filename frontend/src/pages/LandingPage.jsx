import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Shield, DollarSign } from "lucide-react"
import { Upload, BookOpen, CheckCircle, Star } from "lucide-react"
import Footer from "@/components/Footer"
import { Link } from "react-router"


const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Turn Your Class Notes Into
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Cash</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    The first student-to-student marketplace built specifically for your campus. Buy and sell high-quality class
                    notes and study materials securely.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6">
                        <Link to="/signup">Start Selling Notes</Link>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                        <Link to="/signin">Browse Notes</Link>
                        <Search className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>


            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem Every Student Faces</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            You spend hours creating amazing notes, but they just sit there unused. Meanwhile, other students struggle
                            to find quality study materials.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-6 w-6 text-red-600" />
                                </div>
                                <CardTitle className="text-lg">Messy Sharing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Relying on messy Google Drive links and WhatsApp groups</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-6 w-6 text-red-600" />
                                </div>
                                <CardTitle className="text-lg">Trust Issues</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Risk of scams, low-quality files, and no verification</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <DollarSign className="h-6 w-6 text-red-600" />
                                </div>
                                <CardTitle className="text-lg">No Rewards</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Creators don't get rewarded for their hard work</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">How StudyStash Solves This</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            A secure, campus-specific platform where students can monetize their notes and access quality study
                            materials from their peers.
                        </p>
                    </div>

                    <div className="mt-6 grid lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute -top-3 -left-3 w-16 h-16 bg-green-100 rounded-full opacity-20"></div>
                            <Card className="relative bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Upload className="h-5 w-5 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">For Note Creators</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">Turn your hard work into passive income</p>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Upload & Price Your Notes</h4>
                                            <p className="text-gray-600 text-xs">
                                                Set your own prices and upload notes in any format - PDF, Word, images, or code files
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <DollarSign className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Earn Passive Income</h4>
                                            <p className="text-gray-600 text-xs">
                                                Get paid automatically every time someone downloads your notes - no extra work required
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Star className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Build Your Reputation</h4>
                                            <p className="text-gray-600 text-xs">
                                                Get rated by buyers and build a trusted profile to increase your sales
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
                            <Card className="relative bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Search className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">For Note Buyers</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">Access premium study materials from your peers</p>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <BookOpen className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Browse Verified Notes</h4>
                                            <p className="text-gray-600 text-xs">
                                                Find high-quality notes from your specific campus, courses, and professors
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Shield className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Secure Payments</h4>
                                            <p className="text-gray-600 text-xs">
                                                Pay safely with built-in buyer protection and instant download access
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Quality Guaranteed</h4>
                                            <p className="text-gray-600 text-xs">
                                                Read detailed reviews and ratings before purchasing to ensure you get the best materials
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

                <Footer/>

        </div>
    )
}

export default LandingPage
